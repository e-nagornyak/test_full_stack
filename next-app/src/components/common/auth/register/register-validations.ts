import * as z from "zod"

import { email, name, password } from "@/lib/validations/shared"

type RegisterFormData = z.infer<typeof registerFormSchema>

const registerFormSchema = z.object({
  name,
  email,
  password,
})

export { type RegisterFormData, registerFormSchema }
