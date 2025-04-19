import { Injectable } from '@nestjs/common'
import { Prisma, Settings } from '@prisma/client'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SettingsCreateInput): Promise<Settings> {
    return this.prisma.settings.create({
      data,
    })
  }

  async findAll(params?: {
    where?: Prisma.SettingsWhereInput
    orderBy?: Prisma.SettingsOrderByWithRelationInput
    skip?: number
    take?: number
  }): Promise<Settings[]> {
    const { where, orderBy, skip, take } = params || {}
    return this.prisma.settings.findMany({
      where,
      orderBy,
      skip,
      take,
    })
  }

  async findOne(id: number): Promise<Settings | null> {
    return this.prisma.settings.findUnique({
      where: { id },
    })
  }

  async findByName(name: string): Promise<Settings | null> {
    return this.prisma.settings.findFirst({
      where: { name },
    })
  }

  async update(
    id: number,
    data: Prisma.SettingsUpdateInput,
  ): Promise<Settings> {
    return this.prisma.settings.update({
      where: { id },
      data,
    })
  }

  async remove(id: number): Promise<Settings> {
    return this.prisma.settings.delete({
      where: { id },
    })
  }
}
