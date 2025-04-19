import { IsDate, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

export class UserStatsInput {
  @IsOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  startDate?: Date

  @IsOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  endDate?: Date
}
