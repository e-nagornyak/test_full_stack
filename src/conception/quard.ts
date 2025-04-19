import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    // const user = request.user;
    const isAuth = request.headers.authorization === 'secret'

    if (!isAuth) {
      throw new UnauthorizedException()
    }

    return isAuth
  }
}
