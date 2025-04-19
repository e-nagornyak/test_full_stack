import { Observable } from 'rxjs'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()
    // const res = context.switchToHttp().getResponse();

    console.log('LoggingInterceptor')
    console.log('req.headers', req.headers)
    console.log('req.body', req.body)
    return next.handle()
  }
}
