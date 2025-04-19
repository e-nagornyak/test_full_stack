import { NextRequest, NextResponse } from "next/server"
import { routing } from "@/i18n/routing"
import { apiGuardMiddleware } from "@/middlewares/api/api-guard-middleware"
import createMiddleware from "next-intl/middleware"

const intlMiddleware = createMiddleware(routing)

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/api/download",
    "/api/logger",
    "/api/optimize-image",
  ],
}
//

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const privateRoutes = config.matcher.slice(1)

  if (privateRoutes?.includes(pathname)) {
    const { isValid } = apiGuardMiddleware(request)

    if (!isValid) {
      return new NextResponse(JSON.stringify({ error: "Access denied" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    }
  }

  if (!pathname.includes("/api")) {
    return intlMiddleware(request)
  }

  return NextResponse.next()
}
