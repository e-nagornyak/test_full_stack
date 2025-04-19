import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true

    const request = context.switchToHttp().getRequest<Request>()
    const apiKey = request.headers['x-api-key'] as string

    const expectedApiKey = this.configService.get<string>('API_KEY')

    if (!apiKey || apiKey !== expectedApiKey) {
      throw new UnauthorizedException('Invalid API key')
    }

    return true
  }
}
