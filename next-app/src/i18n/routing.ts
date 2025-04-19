import { locales } from "@/locales/config"
import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "never",

  // pathnames: {
  //   "/": "/",
  // "/pathnames": {
  //   en: "/pathnames",
  //   pl: "/pfadnamen",
  // },
  // },
})

// export type Pathnames = keyof typeof routing.pathnames
// export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing)
