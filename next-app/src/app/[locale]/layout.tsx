import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { NextIntlClientProvider } from "next-intl"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/cn"
import { fontMono, fontSans } from "@/lib/fonts"
import { authOptions } from "@/lib/next-auth"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/providers/auth-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { TailwindIndicator } from "@/components/shared/tailwind-indicator"

import "@/styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../locales/${locale}.json`))?.default
  } catch (error) {
    notFound()
  }
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps extends React.PropsWithChildren {
  params: Promise<{ locale?: string }>
}

export default async function RootLayout({
  params,
  children,
}: RootLayoutProps) {
  const locale = (await params)?.locale || "en"
  const messages = await getMessages(locale)
  const session = await getServerSession(authOptions)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/logo/white_log_fav.svg"
          type="image/svg+xml"
          sizes="180x180"
        />
      </head>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <AuthProvider session={session}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <TailwindIndicator />
            </ThemeProvider>
          </NextIntlClientProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
