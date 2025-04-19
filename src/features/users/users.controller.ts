import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { PaginatedResponse } from '../../common/decorators/pagination.decorator'
import { LogModel } from '../logs/models/log.model'
import { UserAllLogsInput } from './models/user-all-logs.input'
import { User } from '@prisma/client'
import { UserStatsInput } from './models/user-stats-input'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Get('')
  allUsers(): Promise<Partial<User>[]> {
    return this.userService.findAllUsers()
  }

  @Get(':id/stats')
  @UsePipes(new ValidationPipe())
  allStats(@Param('id') id: string, @Query() query: UserStatsInput) {
    return this.userService.getUserStatsByDay(
      +id,
      query.startDate,
      query.endDate,
    )
  }

  @Get(':id/logs')
  @UsePipes(new ValidationPipe())
  @PaginatedResponse(LogModel)
  findAllUserLogs(@Param('id') id: string, @Query() query: UserAllLogsInput) {
    const { page = 1, limit = 10, ordering } = query

    return this.userService.findAllUserLogs(+id, page, limit, ordering)
  }
}
