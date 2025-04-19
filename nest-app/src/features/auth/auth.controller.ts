import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserModel } from './models/register-user.model'
import { LoginUserModel } from './models/login-user.model'
import { SocialAuthModel } from './models/social-auth.model'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() user: RegisterUserModel) {
    return this.authService.register(user)
  }

  @Post('login')
  login(@Body() user: LoginUserModel) {
    return this.authService.login(user)
  }

  @Post('social-auth')
  socialAuth(@Body() socialUser: SocialAuthModel) {
    return this.authService.socialAuth(socialUser)
  }
}
