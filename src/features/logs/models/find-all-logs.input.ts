import { Log, LogType } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'
import { PaginationInput } from '../../../common/models/pagination.input'

export class FindAllLogsInput extends PaginationInput {
  @IsOptional()
  ordering?: keyof Log

  @IsOptional()
  @IsEnum(LogType, { each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',')
    }
    return value
  })
  type?: LogType | LogType[]

  @IsOptional()
  @IsNumber({}, { each: true })
  userId?: number
}
