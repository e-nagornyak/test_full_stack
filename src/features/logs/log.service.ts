import { BadRequestException, Injectable } from '@nestjs/common'
import { LogModel } from './models/log.model'
import { PrismaService } from '../../prisma.service'
import { Log, LogType, Order, Prisma, Product } from '@prisma/client'
import { createPaginator, PaginatedResult } from '../../libs/create-pagination'
import { UsersService } from '../users/users.service'
import * as dayjs from 'dayjs'
import { DayStats, UserStats } from './models/types'

@Injectable()
export class LogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async create(log: LogModel, token: string) {
    const user = await this.userService.findOrCreateUser(log?.userId, token)

    let entity: Order | Product

    if (log?.orderId) {
      entity = await this.prisma.order.upsert({
        where: { originalId: log.orderId },
        update: {},
        create: { originalId: log.orderId },
      })
    } else if (log.productId) {
      entity = await this.prisma.product.upsert({
        where: { originalId: log.productId },
        update: {},
        create: { originalId: log.productId },
      })
    }

    return this.prisma.log.create({
      data: {
        type: log?.type,
        userId: user?.id,
        payload: log?.payload,
        ...(log?.orderId ? { orderId: entity?.id } : {}),
        ...(log?.productId ? { productId: entity?.id } : {}),
      },
    })
  }

  async findAll(
    page: number,
    limit: number,
    ordering?: keyof Log,
    type?: LogType | LogType[],
    userId?: number,
  ): Promise<PaginatedResult<Log>> {
    const paginate = createPaginator({ limit })

    // Determine the sort order
    const orderBy: Prisma.LogFindManyArgs['orderBy'] = {}

    if (ordering) {
      const [field, direction] = ordering?.startsWith('-')
        ? [ordering.slice(1), 'desc'] // If ordering starts with "-", sort in descending order
        : [ordering, 'asc'] // Otherwise, in ascending order

      // Check if the field is valid for sorting
      const allowedFields: Array<keyof Log> = ['createdAt', 'updatedAt', 'id'] // Add other fields if needed
      if (allowedFields.includes(field as keyof Log)) {
        orderBy[field] = direction
      }
    } else {
      // If ordering is not specified, sort by default
      orderBy['createdAt'] = 'desc'
    }

    // Build where clause for filters
    const where: Prisma.LogWhereInput = {}

    if (type) {
      where.type = Array.isArray(type) ? { in: type } : type
    }

    if (userId) {
      where.user = { originalId: Number(userId) }
    }

    return paginate<Log, Prisma.LogFindManyArgs>(
      this.prisma.log,
      {
        where,
        include: {
          user: {
            select: {
              id: true,
              originalId: true,
              name: true,
            },
          },
          order: {
            select: {
              id: true,
              originalId: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
              originalId: true,
            },
          },
        },
        orderBy,
      },
      { page },
    )
  }

  async getOrderLogs(id: number) {
    const order = await this.prisma.order.findFirst({
      where: { originalId: id },
      include: {
        logs: {
          // take: 6,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            type: true,
            payload: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                originalId: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (!order) {
      return []
    }

    return order.logs
  }

  findOne(id: number) {
    return `This action returns a #${id} log`
  }

  remove(id: number) {
    return `This action removes a #${id} log`
  }

  async getUsersStats(
    userIds: number[],
    startDate?: Date,
    endDate?: Date,
  ): Promise<DayStats[]> {
    // Валідація дат
    const start = startDate ? dayjs(startDate) : null
    const end = endDate ? dayjs(endDate) : null

    // If both dates are provided, check that start is not after end
    if (start && end && start.isAfter(end)) {
      throw new BadRequestException('Start date cannot be after end date.')
    }

    // Auxiliary functions for normalization of dates
    const normalizeStartDate = (date?: Date): Date =>
      date
        ? dayjs(date).startOf('day').toDate()
        : dayjs().startOf('day').toDate()
    const normalizeEndDate = (date?: Date): Date =>
      date ? dayjs(date).endOf('day').toDate() : dayjs().endOf('day').toDate()

    // Definition of the period
    let finalStart: Date
    let finalEnd: Date
    if (!start && !end) {
      const extremeDates = await this.prisma.log.aggregate({
        where: { userId: { in: userIds }, type: 'packEnd' },
        _min: { createdAt: true },
        _max: { createdAt: true },
      })
      finalStart = extremeDates._min.createdAt
        ? normalizeStartDate(extremeDates._min.createdAt)
        : normalizeStartDate()
      finalEnd = extremeDates._max.createdAt
        ? normalizeEndDate(extremeDates._max.createdAt)
        : normalizeEndDate()
    } else {
      finalStart = normalizeStartDate(startDate)
      finalEnd = normalizeEndDate(endDate)
    }

    // Getting logs along with users' data
    const logsWithUsers = await this.prisma.log.findMany({
      where: {
        userId: { in: userIds },
        type: {
          in: [LogType.packEnd, LogType.packAddManual, LogType.packAddByScan],
        },
        createdAt: {
          gte: finalStart,
          lte: finalEnd,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    // Grouping logs by dates
    const logsByDate = logsWithUsers.reduce(
      (acc, log) => {
        const date = dayjs(log.createdAt).format('YYYY-MM-DD')
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(log)
        return acc
      },
      {} as Record<string, typeof logsWithUsers>,
    )

    // Treatment of statistics for each day
    const result: DayStats[] = []
    for (const date of Object.keys(logsByDate)) {
      const logsForDay = logsByDate[date]
      const dayStats: DayStats = {
        date,
        total: 0,
      }

      // processing logs for each user
      const userStats = logsForDay.reduce(
        (acc, log) => {
          const user = log.user
          if (!acc[user.id]) {
            acc[user.id] = {
              id: user.id,
              name: user.name,
              email: user.email,
              count: 0,
              packAddManualCount: 0,
              packAddByScanCount: 0,
              totalProducts: 0,
            }
          }
          const stats = acc[user.id]
          if (log.type === LogType.packEnd) {
            stats.count++
            dayStats.total++
          } else if (log.type === LogType.packAddManual) {
            stats.packAddManualCount++
          } else if (log.type === LogType.packAddByScan) {
            stats.packAddByScanCount++
          }
          stats.totalProducts += log.totalProducts || 0
          return acc
        },
        {} as Record<number, UserStats>,
      )

      // Adding users' statistics to the day
      Object.entries(userStats).forEach(([userId, stats]) => {
        dayStats[`user_${userId}`] = stats
      })

      // Adding a day to results if there is an activity
      if (dayStats.total > 0 || Object.keys(dayStats).length > 2) {
        result.push(dayStats)
      }
    }

    return result
  }

  // update(id: number, updateLogDto: UpdateLogDto) {
  //   return `This action updates a #${id} log`;
  // }
}
