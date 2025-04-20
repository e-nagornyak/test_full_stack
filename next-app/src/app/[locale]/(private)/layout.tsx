import React, { type PropsWithChildren, type ReactNode } from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { RoutePaths } from "@/config/routes"
import { authOptions } from "@/lib/next-auth"
import { DefaultPrivateHeader } from "@/components/layouts/private/default/default-private-header"

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect(RoutePaths.auth.login)
  }

  return (
    <div className="flex">
      <div className="relative flex min-h-screen flex-1 flex-col">
        <DefaultPrivateHeader session={session} />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  )
}
