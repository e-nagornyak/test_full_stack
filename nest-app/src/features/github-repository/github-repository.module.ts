import { Module } from '@nestjs/common'
import { GithubRepositoryService } from './github-repository.service'
import { GithubRepositoryController } from './github-repository.controller'
import { PrismaService } from '../../prisma.service'
import { GithubApiService } from './github-api.service'

@Module({
  controllers: [GithubRepositoryController],
  providers: [GithubRepositoryService, GithubApiService, PrismaService],
})
export class GithubRepositoryModule {}
