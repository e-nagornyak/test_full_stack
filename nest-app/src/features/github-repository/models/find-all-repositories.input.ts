import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
import { GithubRepository } from '@prisma/client'
import { PaginationInput } from '../../../common/models/pagination.input'

export class FindAllRepositoriesInput extends PaginationInput {
  @IsOptional()
  orderBy?: Omit<keyof GithubRepository, 'id'>

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  orderDirection?: 'asc' | 'desc' = 'desc'

  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  minStars?: number

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  minForks?: number

  @IsOptional()
  @IsString()
  owner?: string

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  userId?: number
}
