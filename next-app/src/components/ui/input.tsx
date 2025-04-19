import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/cn"

export const inputVariants = cva(
  "flex w-full transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      color: {
        accent: "bg-accent",
      },
      variant: {
        default: "rounded-md border border-input shadow-xs",
      },
      size: {
        xs: "px-2 py-1 text-sm",
        default: "h-9 px-3 py-1 text-sm",
        md: "text-md px-2 py-3",
      },
    },
    defaultVariants: {
      color: "accent",
      variant: "default",
      size: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color">,
    VariantProps<typeof inputVariants> {
  isError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, variant, color, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, variant, color }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
