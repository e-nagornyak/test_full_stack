import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"

import { RoutePaths } from "@/config/routes"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from "@/components/ui/link"
import { PasswordInput } from "@/components/ui/password-input"

import { loginFormSchema, type LoginFormData } from "./login-validations"

interface LoginFormProps {
  onSubmit: SubmitHandler<LoginFormData>
  isPending?: boolean
}

export const LoginForm = ({ onSubmit, isPending }: LoginFormProps) => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          defaultValue=""
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          defaultValue=""
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={"space-y-2"}>
          <Link
            buttonStyles={{ size: "lg", variant: "outline" }}
            className="w-full"
            variant={"ghost"}
            href={RoutePaths.auth.register}
          >
            Sign On
          </Link>
          <Button
            className="w-full"
            size="lg"
            disabled={!isDirty || isPending}
            type="submit"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  )
}
