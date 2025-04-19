import { BadRequestException, Injectable } from '@nestjs/common'
import { Log, Prisma, User } from '@prisma/client'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../../prisma.service'
import { createPaginator } from '../../libs/create-pagination'
import * as dayjs from 'dayjs'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  findOne(id: number): Promise<User> {
    return this.prisma.user.findFirst({
      where: { originalId: id },
    })
  }

  findAllUsers(): Promise<Partial<User>[]> {
    return this.prisma.user.findMany({
      select: { id: true, name: true, originalId: true },
      orderBy: { name: 'asc' },
    })
  }

  async getUserStatsByDay(userId: number, startDate?: Date, endDate?: Date) {
    // Validate dates
    const start = startDate ? dayjs(startDate) : null
    const end = endDate ? dayjs(endDate) : null

    // If both dates are provided, check that start is not after end
    if (start && end && start.isAfter(end)) {
      throw new BadRequestException('Start date cannot be after end date.')
    }

    // If no dates provided, find the entire period of user logs
    let finalStart: Date
    let finalEnd: Date

    if (!start && !end) {
      const extremeDates = await this.prisma.log.aggregate({
        where: {
          userId,
          type: 'packEnd',
        },
        _min: { createdAt: true },
        _max: { createdAt: true },
      })

      finalStart = extremeDates._min.createdAt
        ? dayjs(extremeDates._min.createdAt).startOf('day').toDate()
        : dayjs().startOf('day').toDate()

      finalEnd = extremeDates._max.createdAt
        ? dayjs(extremeDates._max.createdAt).endOf('day').toDate()
        : dayjs().endOf('day').toDate()
    } else {
      // Use provided dates or default to today
      finalStart = start
        ? start.startOf('day').toDate()
        : dayjs().startOf('day').toDate()
      finalEnd = end ? end.endOf('day').toDate() : dayjs().endOf('day').toDate()
    }

    const logs = await this.prisma.log.findMany({
      where: {
        userId,
        type: 'packEnd',
        createdAt: {
          gte: finalStart,
          lte: finalEnd,
        },
      },
      select: {
        createdAt: true,
      },
    })

    // Group logs after day
    const logCounts: Record<string, number> = {}

    logs.forEach((log) => {
      const date = dayjs(log.createdAt).format('YYYY-MM-DD')
      logCounts[date] = (logCounts[date] || 0) + 1
    })

    // Form an array with all dates in the specified range
    const daysInRange: { date: string; count: number }[] = []
    let currentDay = dayjs(finalStart)

    while (
      currentDay.isBefore(finalEnd) ||
      currentDay.isSame(finalEnd, 'day')
    ) {
      const date = currentDay.format('YYYY-MM-DD')
      daysInRange.push({ date, count: logCounts[date] || 0 })
      currentDay = currentDay.add(1, 'day')
    }

    return daysInRange
  }

  async findOrCreateUser(userId: number, token: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { originalId: userId },
    })

    if (user) {
      return user
    }

    const baseUrl = this.config.get<string>('MAIN_BACKEND_URL')
    const response = await fetch(`${baseUrl}/api/shuser/users/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new BadRequestException('User not found')
    }

    const res: {
      id: number
      username: string
      role: string
    } = await response.json()

    return this.prisma.user.create({
      data: { name: res.username, originalId: res.id },
    })
  }

  async findAllUserLogs(
    id: number,
    page: number,
    limit: number,
    ordering?: keyof Log,
  ) {
    const user = await this.prisma.user.findFirst({
      where: { originalId: id },
    })

    if (!user) {
      return {
        meta: {
          total: 0,
          lastPage: 0,
          currentPage: 0,
          limit: 0,
          prev: 0,
          next: 0,
        },
        data: [],
      }
    }

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

    return paginate<Log, Prisma.LogFindManyArgs>(
      this.prisma.log,
      {
        where: { user: { originalId: id } },
        include: {
          order: { select: { id: true, originalId: true } },
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
}
