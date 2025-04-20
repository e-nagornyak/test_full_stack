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

import {
  registerFormSchema,
  type RegisterFormData,
} from "./register-validations"

interface RegisterFormProps {
  onSubmit: SubmitHandler<RegisterFormData>
  isPending?: boolean
}

export const RegisterForm = ({ onSubmit, isPending }: RegisterFormProps) => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            href={RoutePaths.auth.login}
          >
            Sign Up
          </Link>
          <Button
            className="w-full"
            size="lg"
            disabled={isPending}
            type="submit"
          >
            Sign On
          </Button>
        </div>
      </form>
    </Form>
  )
}
