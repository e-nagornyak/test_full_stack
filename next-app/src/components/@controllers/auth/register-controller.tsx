"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import { RoutePaths } from "@/config/routes"
import { registerReq } from "@/lib/api/auth/auth-api"
import { showErrorToast } from "@/lib/handle-error"
import { RegisterForm } from "@/components/common/auth/register/register-form"
import { RegisterFormData } from "@/components/common/auth/register/register-validations"
import { FormWrapper } from "@/components/shared/form-wrapper"

export function RegisterController() {
  const [isPending, startTransition] = useTransition()
  const { push } = useRouter()

  const onSubmit = async (data: RegisterFormData) => {
    startTransition(async () => {
      try {
        await registerReq(data)
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
    <FormWrapper withAnimationIn title="Sign on your account">
      <RegisterForm isPending={isPending} onSubmit={onSubmit} />
    </FormWrapper>
  )
}
