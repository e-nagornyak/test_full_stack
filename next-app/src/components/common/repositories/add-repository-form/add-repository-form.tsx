import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  AddRepositoryFormData,
  addRepositorySchema,
} from "@/components/common/repositories/add-repository-form/login-validations"

interface AddRepositoryFormProps {
  error: string | null
  //
  onSubmit: SubmitHandler<AddRepositoryFormData>
}

export function AddRepositoryForm({ error, onSubmit }: AddRepositoryFormProps) {
  const form = useForm<AddRepositoryFormData>({
    resolver: zodResolver(addRepositorySchema),
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting, isSubmitSuccessful },
  } = form

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ path: "" })
    }
  }, [isSubmitSuccessful])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="flex gap-2">
          <FormField
            defaultValue=""
            control={control}
            name="path"
            render={({ field }) => (
              <FormItem className={"w-full"}>
                <FormControl>
                  <Input
                    required
                    placeholder="owner/title-reposition (eg: facebook/react)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className={"min-w-36"}
            type="submit"
            disabled={!isDirty}
            loading={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add repository"}
          </Button>
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
    </Form>
  )
}
