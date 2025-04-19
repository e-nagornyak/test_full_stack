import { Module } from '@nestjs/common'
import { LogService } from './log.service'
import { LogController } from './log.controller'
import { PrismaService } from '../../prisma.service'
import { UsersService } from '../users/users.service'

@Module({
  controllers: [LogController],
  providers: [LogService, PrismaService, UsersService],
})
export class LogModule {}
