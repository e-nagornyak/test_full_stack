import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { AuthGuard } from './common/quards/auth-guard'
import { AuthModule } from './features/auth/auth.module'
import { GithubRepositoryModule } from './features/github-repository/github-repository.module'

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 1 minute
          limit: 50,
        },
      ],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    GithubRepositoryModule,
  ],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AppModule {}
