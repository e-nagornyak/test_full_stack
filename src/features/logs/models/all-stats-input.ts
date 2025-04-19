import { IsArray, IsDate, IsOptional } from 'class-validator'
import { Transform, Type } from 'class-transformer'

export class AllStatsInput {
  @IsArray()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : value.split(',').map(Number),
  )
  userIds: number[]

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date
}
