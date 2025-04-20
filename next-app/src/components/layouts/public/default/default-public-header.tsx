import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/next-auth"
import { DefaultPublicNav } from "@/components/layouts/public/default/default-public-nav"
import { Logo } from "@/components/shared/logo"

export async function DefaultPublicHeader() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full rounded-b-md border-b p-2 shadow-md backdrop-blur-sm md:px-12 md:py-0 dark:border-white">
      <div className="flex items-center justify-between py-1">
        <Logo className="pr-2 md:pr-6 xl:pr-14" />
        <DefaultPublicNav user={user} />
      </div>
    </header>
  )
}
