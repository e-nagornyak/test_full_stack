"use client"

// Error boundaries must be Client Components
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Title } from "@/components/ui/title"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("error", error)
  }, [error])

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="">
        <CardContent className="flex flex-col gap-4">
          <Title size="lg">Something went wrong!</Title>
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              async () => {
                reset()
              }
            }
          >
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
