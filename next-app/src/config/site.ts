import { env } from "@/env"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Test.",
  description: "Test",
  url: env.NEXT_PUBLIC_FRONTEND_URL,
}
