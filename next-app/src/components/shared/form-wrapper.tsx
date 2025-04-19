import { type PropsWithChildren } from "react"

import { cn } from "@/lib/cn"
import { Title } from "@/components/ui/title"
import { Logo } from "@/components/shared/logo"

interface FormWrapperProps extends PropsWithChildren {
  title?: string
  wrapperClassName?: string
  withAnimationIn?: boolean
}

export function FormWrapper({
  wrapperClassName,
  title,
  withAnimationIn = false,
  children,
}: FormWrapperProps) {
  return (
    <div
      className={cn(
        "h-fit w-full max-w-lg rounded-lg border border-border bg-white p-6 shadow-md dark:bg-black",
        { "duration-500 animate-in slide-in-from-top": withAnimationIn },
        wrapperClassName
      )}
    >
      <Logo className="text-center" />
      {title && (
        <Title className="mb-6 text-center" size="lg">
          {title}
        </Title>
      )}
      {children}
    </div>
  )
}
