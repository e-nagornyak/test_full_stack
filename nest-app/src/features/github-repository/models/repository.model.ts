import { GithubRepository } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class RepositoryModel implements GithubRepository {
  @ApiProperty()
  id: number

  @ApiProperty()
  owner: string

  @ApiProperty()
  name: string

  @ApiProperty()
  url: string

  @ApiProperty()
  stars: number

  @ApiProperty()
  forks: number

  @ApiProperty()
  issues: number

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  userId: number
}
