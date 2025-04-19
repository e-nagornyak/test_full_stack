import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface GithubRepositoryData {
  html_url: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
}

@Injectable()
export class GithubApiService {
  private readonly logger = new Logger(GithubApiService.name)
  private readonly httpClient: AxiosInstance

  constructor(private readonly configService: ConfigService) {
    const config: AxiosRequestConfig = {
      baseURL: 'https://api.github.com',
      timeout: 5000, // 5 seconds
    }

    const githubToken = this.configService.get<string>('GITHUB_TOKEN')

    if (githubToken) {
      config.headers = {
        Authorization: `token ${githubToken}`,
      }
    }

    this.httpClient = axios.create(config)
  }

  async getRepositoryData(
    owner: string,
    name: string,
  ): Promise<GithubRepositoryData> {
    this.logger.log(`Fetching repository data for ${owner}/${name}`)

    try {
      const response = await this.httpClient.get<GithubRepositoryData>(
        `/repos/${owner}/${name}`,
      )
      return response.data
    } catch (error) {
      this.logger.error(
        `Error fetching repository data: ${error.message}`,
        error.stack,
      )
      throw error
    }
  }
}
