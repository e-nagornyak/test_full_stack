import * as z from "zod"

type AddRepositoryFormData = z.infer<typeof addRepositorySchema>

const addRepositorySchema = z.object({
  path: z.string().trim().min(1),
})

export { type AddRepositoryFormData, addRepositorySchema }
