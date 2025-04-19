import { isRedirectError } from "next/dist/client/components/redirect-error"
import { toast } from "sonner"
import { z } from "zod"

export function getErrorMessage(err: unknown): {
  message: string
  details?: string
} {
  const unknownError = "Something went wrong, please try again later."

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return { message: errors.join("\n") }
  } else if (err instanceof Error) {
    return { message: err.message }
  } else if (isRedirectError(err)) {
    throw err
  } else if (
    err instanceof Object &&
    "message" in err &&
    typeof err?.message === "string"
  ) {
    return { message: err?.message }
  } else {
    return { message: unknownError }
  }
}

export function showErrorToast(err: unknown, showDetails = true) {
  const res = getErrorMessage(err)

  return toast.error(
    res?.message,
    showDetails ? { description: res?.details } : undefined
  )
}
