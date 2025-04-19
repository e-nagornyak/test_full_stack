import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { CreateRepositoryModel } from './models/create-repository.model'
import { PrismaService } from '../../prisma.service'
import { FindAllRepositoriesInput } from './models/find-all-repositories.input'
import { createPaginator } from '../../libs/create-pagination'
import { GithubRepository, Prisma } from '@prisma/client'
import { GithubApiService } from './github-api.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GithubRepositoryService {
  private readonly logger = new Logger(GithubRepositoryService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly githubApiService: GithubApiService,
    private readonly configService: ConfigService,
  ) {}

  async create(
    userId: number,
    createRepositoryDto: CreateRepositoryModel,
  ): Promise<GithubRepository> {
    const { repositoryPath } = createRepositoryDto
    this.logger.log(
      `Creating repository with path: ${repositoryPath} for user: ${userId}`,
    )

    const { owner, name } = this.parseRepositoryPath(repositoryPath)

    await this.checkRepositoryExists(userId, owner, name)

    try {
      const repoData = await this.githubApiService.getRepositoryData(
        owner,
        name,
      )

      return await this.prisma.$transaction(async (tx) => {
        const repository = await tx.githubRepository.create({
          data: {
            userId,
            owner,
            name,
            url: repoData.html_url,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            issues: repoData.open_issues_count,
          },
        })

        this.logger.log(`Repository created with ID: ${repository.id}`)
        return repository
      })
    } catch (error) {
      this.handleGithubApiError(error, owner, name)
    }
  }

  async findAll(userId: number, options: FindAllRepositoriesInput) {
    this.logger.log(
      `Finding repositories for user: ${userId} with options: ${JSON.stringify(options)}`,
    )

    const paginate = createPaginator(options)

    const orderBy: Prisma.GithubRepositoryFindManyArgs['orderBy'] = {
      createdAt: Prisma.SortOrder.desc,
    }

    const where: Prisma.GithubRepositoryWhereInput = { userId }

    return paginate<GithubRepository, Prisma.GithubRepositoryFindManyArgs>(
      this.prisma.githubRepository,
      {
        where,
        orderBy,
      },
      options,
    )
  }

  async findOne(userId: number, id: number): Promise<GithubRepository> {
    this.logger.log(`Finding repository with ID: ${id} for user: ${userId}`)

    const repository = await this.prisma.githubRepository.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!repository) {
      this.logger.warn(
        `Repository with ID: ${id} not found for user: ${userId}`,
      )
      throw new NotFoundException(`Repository with ID: ${id} not found`)
    }

    return repository
  }

  async update(userId: number, id: number): Promise<GithubRepository> {
    this.logger.log(`Updating repository with ID: ${id} for user: ${userId}`)

    const repository = await this.findOne(userId, id)

    try {
      const repoData = await this.githubApiService.getRepositoryData(
        repository.owner,
        repository.name,
      )

      const updatedRepository = await this.prisma.githubRepository.update({
        where: { id },
        data: {
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          issues: repoData.open_issues_count,
          updatedAt: new Date(),
        },
      })

      this.logger.log(`Repository with ID: ${id} successfully updated`)
      return updatedRepository
    } catch (error) {
      this.handleGithubApiError(error, repository.owner, repository.name)
    }
  }

  async remove(userId: number, id: number): Promise<{ message: string }> {
    this.logger.log(`Removing repository with ID: ${id} for user: ${userId}`)

    await this.findOne(userId, id)

    await this.prisma.$transaction(async (tx) => {
      await tx.githubRepository.delete({
        where: { id },
      })
    })

    this.logger.log(`Repository with ID: ${id} successfully deleted`)
    return { message: 'The repository has been successfully deleted' }
  }

  private parseRepositoryPath(repositoryPath: string): {
    owner: string
    name: string
  } {
    if (!repositoryPath || !repositoryPath.includes('/')) {
      throw new BadRequestException(
        'Invalid repository format. Must be "owner/repository-name"',
      )
    }

    const [owner, name] = repositoryPath.split('/')

    if (!owner || !name) {
      throw new BadRequestException(
        'Invalid repository format. Both owner and repository name must be provided',
      )
    }

    return { owner, name }
  }

  private async checkRepositoryExists(
    userId: number,
    owner: string,
    name: string,
  ): Promise<void> {
    const existingRepository = await this.prisma.githubRepository.findFirst({
      where: {
        userId,
        owner,
        name,
      },
    })

    if (existingRepository) {
      this.logger.warn(
        `Repository ${owner}/${name} already exists for user: ${userId}`,
      )
      throw new BadRequestException(
        `Repository ${owner}/${name} has already been added`,
      )
    }
  }

  private handleGithubApiError(error: any, owner: string, name: string): never {
    if (error?.response?.status === 404) {
      this.logger.warn(`Repository ${owner}/${name} not found on GitHub`)
      throw new NotFoundException(
        `Repository ${owner}/${name} not found on GitHub`,
      )
    }

    this.logger.error(`GitHub API error: ${error.message}`, error.stack)
    throw new BadRequestException(
      `Error fetching data from GitHub API: ${this.configService.get('NODE_ENV') === 'development' ? error.message : 'Please try again later'}`,
    )
  }
}
