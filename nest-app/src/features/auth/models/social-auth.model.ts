import { IsString, IsEmail, IsOptional } from 'class-validator'

export class SocialAuthModel {
  @IsString()
  accessToken: string

  @IsString()
  provider: string

  @IsString()
  providerAccountId: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  image?: string
}
