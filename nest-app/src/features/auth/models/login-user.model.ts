import { IsEmail, IsString } from 'class-validator'

export class LoginUserModel {
  @IsEmail()
  email: string

  @IsString()
  password: string
}
