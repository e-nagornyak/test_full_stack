import { Log } from '@prisma/client'
import { IsOptional } from 'class-validator'
import { PaginationInput } from '../../../common/models/pagination.input'

export class UserAllLogsInput extends PaginationInput {
  @IsOptional()
  ordering?: keyof Log
}
