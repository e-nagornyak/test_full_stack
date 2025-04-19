import * as z from "zod"

const email = z.string().trim().email()
const password = z.string().trim().min(3).max(32)

export { email, password }
