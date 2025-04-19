import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LogModule } from './features/logs/log.module'
import { UsersModule } from './features/users/users.module'
import { ThrottlerModule } from '@nestjs/throttler'
import { AuthGuard } from './common/quards/auth-guard'
import { SettingsModule } from './features/settings/settings.module';

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
    LogModule,
    UsersModule,
    SettingsModule,
  ],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AppModule {}
