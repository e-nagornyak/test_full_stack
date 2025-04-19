import * as z from "zod"

import { email, password } from "@/lib/validations/shared"

type loginFormData = z.infer<typeof loginFormSchema>

const loginFormSchema = z.object({
  email,
  password,
})

export { type loginFormData, loginFormSchema }
