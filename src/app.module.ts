import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { AuthGuard } from './common/quards/auth-guard'

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 1 minute in milliseconds
          limit: 50, // 50 requests allowed within this timeframe
        },
      ],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AppModule {}
