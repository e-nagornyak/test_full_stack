import { type PropsWithChildren } from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { RoutePaths } from "@/config/routes"

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession()

  if (session?.user) {
    redirect(RoutePaths.public.home)
  }

  return (
    <div
      className={"flex size-full flex-col items-center justify-center pt-14"}
    >
      {children}
    </div>
  )
}
