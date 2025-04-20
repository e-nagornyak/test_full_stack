"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import { RoutePaths } from "@/config/routes"
import { showErrorToast } from "@/lib/handle-error"
import { FormWrapper } from "@/components/shared/form-wrapper"

import { LoginForm } from "../../common/auth/login/login-form"
import { type LoginFormData } from "../../common/auth/login/login-validations"

export function LoginController() {
  const [isPending, startTransition] = useTransition()
  const { push } = useRouter()

  const onSubmit = async (data: LoginFormData) => {
    startTransition(async () => {
      try {
        const res = await signIn("credentials", { ...data, redirect: false })

        if (res?.error) {
          throw new Error(res?.error)
        }

        push(RoutePaths.private.repositories.list)
      } catch (e) {
        showErrorToast(e)
      }
    })
  }

  return (
    <FormWrapper withAnimationIn title="Sign in to your account">
      <LoginForm isPending={isPending} onSubmit={onSubmit} />
    </FormWrapper>
  )
}
