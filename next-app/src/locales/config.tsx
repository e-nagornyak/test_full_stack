import { type ReactNode } from "react"

import { LocaleFlags } from "@/components/shared/localeFlags"

const LocalesEnum = {
  en: "en",
} as const

export const listOfLocales: {
  [key in ListOfLocalesKeys]: { key: string; name: string; flag: ReactNode }
} = {
  en: {
    key: "en",
    flag: <LocaleFlags.USA />,
    name: "English (US)",
  },
}

export type ListOfLocalesKeys = (typeof LocalesEnum)[keyof typeof LocalesEnum]

export const locales: ListOfLocalesKeys[] = ["en"]

export const localesMap = Object.entries(listOfLocales)
  .filter(([key]) => locales?.includes(key as ListOfLocalesKeys))
  .map(([, value]) => value)
