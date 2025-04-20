"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons"
import Cookies from "js-cookie"
import { signOut, useSession } from "next-auth/react"

import { RoutePaths } from "@/config/routes"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"

export function AuthButton(props: ButtonProps) {
  const [isPending, startTransition] = useTransition()

  const session = useSession()
  const { push } = useRouter()

  const onClickHandler = () => {
    startTransition(() => push(RoutePaths.auth.login))
  }

  const onSignOutHandler = async () => {
    try {
      startTransition(async () => {
        const user = session?.data?.user

        await signOut({ redirect: true, callbackUrl: "/" })
        Cookies.remove("accessToken")
      })
    } catch (e) {
      console.log(e)
    }
  }

  const icon = isPending ? (
    <Loader className="size-5" />
  ) : session.data ? (
    <ExitIcon className="size-5" />
  ) : (
    <PersonIcon className="size-5" />
  )

  return session.data ? (
    <Button
      onClick={onSignOutHandler}
      disabled={isPending}
      className="gap-2"
      type="button"
      {...props}
    >
      {icon}
      Log out
    </Button>
  ) : (
    <Button
      onClick={onClickHandler}
      disabled={isPending}
      className="gap-2"
      type="button"
      {...props}
    >
      {icon}
      Sign In
    </Button>
  )
}
