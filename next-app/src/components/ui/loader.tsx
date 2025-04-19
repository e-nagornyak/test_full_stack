import { Loader as LoaderIcon, type LucideProps } from "lucide-react"

import { cn } from "@/lib/cn"

interface LoaderProps extends LucideProps {
  absolute?: boolean
}

export function Loader({ className, absolute, ...rest }: LoaderProps) {
  return (
    <LoaderIcon
      className={cn(
        "animate-spin",
        { "absolute inset-0 z-50 m-auto": absolute },
        className
      )}
      {...rest}
    />
  )
}
