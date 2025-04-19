import { env } from "@/env"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Sh.",
  description: "Sh",
  url: env.NEXT_PUBLIC_FRONTEND_URL,
}
