import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LogService } from './log.service'
import { LogModel } from './models/log.model'
import { PaginatedResult } from '../../libs/create-pagination'
import { FindAllLogsInput } from './models/find-all-logs.input'
import { type Log } from '@prisma/client'
import { PaginatedResponse } from '../../common/decorators/pagination.decorator'
import { Cookies } from '../../common/decorators/cookies.decorator'
import { AllStatsInput } from './models/all-stats-input'
import { DayStats } from './models/types'

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Req() req: Request,
    @Cookies('accessToken') token: string,
    @Body() log: LogModel,
  ): Promise<Log> {
    const authorization = req.headers?.['authorization']

    if (!token && authorization) {
      token = authorization.split(' ')[1]
    }

    return this.logService.create(log, token)
  }

  @Get()
  @PaginatedResponse(LogModel)
  async findAll(
    @Query() query: FindAllLogsInput,
  ): Promise<PaginatedResult<Log>> {
    const { page = 1, limit = 10, ordering, userId, type } = query

    return this.logService.findAll(page, limit, ordering, type, userId)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.logService.findOne(+id)
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logService.remove(+id)
  }

  @Get('order/:id')
  getOrderLogs(@Param('id') id: string) {
    return this.logService.getOrderLogs(+id)
  }

  @Get('stats')
  getStats(
    @Query(new ValidationPipe({ transform: true }))
    query: AllStatsInput,
  ): Promise<DayStats[]> {
    return this.logService.getUsersStats(
      query.userIds,
      query.startDate,
      query.endDate,
    )
  }
}
