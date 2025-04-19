import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'

import { AppModule } from './app.module'
import { AuthGuard } from './common/quards/auth-guard'

async function bootstrap() {
  const PORT = process.env.PORT || 4200
  const globalPrefix = process.env.GLOBAL_PREFIX || 'api'
  const ALLOWED_DOMAINS = process.env.ALLOWED_DOMAINS?.split(',') || []
  const isDevMode = process.env.MODE === 'development'

  if (isDevMode) {
    ALLOWED_DOMAINS.push('http://localhost:3000')
  }

  const app = await NestFactory.create(AppModule)

  app.use(helmet())

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_DOMAINS.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Unauthorized'))
      }
    },
    methods: ['POST', 'OPTIONS', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-KEY'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600, // 10 minutes cache preflight requests
  })

  app.setGlobalPrefix(globalPrefix)
  app.use(cookieParser())

  // Add API Key Guard globally
  const apiKeyGuard = app.get(AuthGuard)
  app.useGlobalGuards(apiKeyGuard)

  // Add CSRF protection for routes with cookies
  // app.use(csurf({ cookie: true }));

  await app.listen(PORT)

  console.log(
    `$\x1b[32m🚀 Backend is running at http://localhost:${PORT}/${globalPrefix}$ x1b [0M`,
  )
}

bootstrap()
