import * as React from "react"
import { ChevronDown } from "lucide-react"
import { type Session } from "next-auth"

import { userHeaderConfig } from "@/config/user-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "@/components/ui/link"
import { AuthButton } from "@/components/common/nav/auth-button"
import { LanguageToggle } from "@/components/shared/language-toggle"
import { Logo } from "@/components/shared/logo"
import { ModeSmallToggle } from "@/components/shared/mode-small-toggle"

interface DefaultPrivateHeaderProps {
  session: Session
}

export function DefaultPrivateHeader({ session }: DefaultPrivateHeaderProps) {
  const user = session?.user

  return (
    <header
      id="private_header"
      className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full rounded-b-md border-b p-2 shadow-md backdrop-blur-sm md:px-12 md:py-0 dark:border-white"
    >
      <nav className="flex size-full items-center justify-between gap-3 py-1">
        <Logo />
        <div className="flex shrink-0 items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="group flex items-center gap-2">
              <span className="bg-highlight flexible-text-5 flex size-10 items-center justify-center rounded-full font-semibold text-white uppercase">
                {user?.name?.[0] || ""}
              </span>
              <span className={"text-lg font-bold capitalize"}>
                {user?.name}
              </span>
              <ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex min-w-56 flex-col items-start justify-between p-4">
              {userHeaderConfig?.map(
                ({ title, hidden, href, prefetch, ...rest }) =>
                  !hidden && (
                    <DropdownMenuItem className="w-full">
                      <Link
                        variant="ghost"
                        prefetch={prefetch}
                        href={href}
                        className={"flex items-center gap-2"}
                      >
                        <rest.icon />
                        <span className={"text-lg"}>{title}</span>
                      </Link>
                    </DropdownMenuItem>
                  )
              )}

              <DropdownMenuSeparator className="mx-auto my-2 w-[95%]" />
              <DropdownMenuItem className="flex w-full justify-center">
                <LanguageToggle />
              </DropdownMenuItem>
              <DropdownMenuSeparator className="mx-auto my-2 w-[95%]" />
              <DropdownMenuItem className="flex w-full justify-center">
                <AuthButton className="w-full gap-2" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeSmallToggle />
        </div>
      </nav>
    </header>
  )
}
