import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { GithubRepositoryService } from './github-repository.service'
import { CreateRepositoryModel } from './models/create-repository.model'
import { User } from '../../common/decorators/user.decorator'
import { PaginatedResponse } from '../../common/decorators/pagination.decorator'
import { RepositoryModel } from './models/repository.model'
import { FindAllRepositoriesInput } from './models/find-all-repositories.input'

@Controller('github-repository')
@UseGuards(JwtAuthGuard)
export class GithubRepositoryController {
  constructor(
    private readonly githubRepositoryService: GithubRepositoryService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@User() user, @Body() repository: CreateRepositoryModel) {
    return this.githubRepositoryService.create(user.id, repository)
  }

  @Get()
  @PaginatedResponse(RepositoryModel)
  findAll(@User() user, @Query() query: FindAllRepositoriesInput) {
    return this.githubRepositoryService.findAll(user.id, query)
  }

  @Get(':id')
  findOne(@User() user, @Param('id', ParseIntPipe) id: number) {
    return this.githubRepositoryService.findOne(user.id, id)
  }

  @Put(':id')
  update(@User() user, @Param('id', ParseIntPipe) id: number) {
    return this.githubRepositoryService.update(user.id, id)
  }

  @Delete(':id')
  remove(@User() user, @Param('id', ParseIntPipe) id: number) {
    return this.githubRepositoryService.remove(user.id, id)
  }
}
