"use client"

import { type PropsWithChildren } from "react"
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

interface AuthProviderProps extends PropsWithChildren {
  session: Session | null
}

export function AuthProvider({ session, children }: AuthProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
