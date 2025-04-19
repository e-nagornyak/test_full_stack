import { IsString } from 'class-validator'

export class CreateRepositoryModel {
  @IsString()
  repositoryPath: string
}
