import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader } from "lucide-react"

import { cn } from "@/lib/cn"

const buttonVariants = cva(
  "focus-visible:ring-ring relative inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs",
        submit:
          "border border-green-600 bg-green-500 font-bold text-white hover:bg-green-500/90",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-xs",
        outline:
          "border-border hover:bg-accent hover:text-accent-foreground border bg-transparent shadow-xs",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-6 rounded-md px-2 text-xs",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8 text-lg",
        xl: "h-14 rounded-md px-10 text-xl",
        icon: "size-9",
      },
      color: {
        blue: "border-blue-500 text-blue-500 hover:bg-blue-500",
        green: "border-green-500 text-green-500 hover:bg-green-500",
        red: "border-rose-500 text-rose-500 hover:bg-rose-500",
        gray: "border-gray-500 text-gray-500 hover:bg-gray-500",
      },
    },
    compoundVariants: [
      {
        variant: [
          "submit",
          "outline",
          "accent",
          "destructive",
          "secondary",
          "destructive",
          "default",
        ],
        className: "cursor-pointer",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  fullWidth?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      size,
      variant,
      color,
      asChild = false,
      type = "button",
      fullWidth,
      children,
      loading,
      disabled,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, color, className }), {
            "w-full": fullWidth,
          })}
          ref={ref}
          children={children}
          {...props}
        />
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, color, className }), {
          "w-full": fullWidth,
        })}
        ref={ref}
        type={type}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="absolute inset-0 z-50 m-auto flex size-full items-center justify-center backdrop-blur-[2px]">
            <Loader className="size-[75%] animate-spin" />
          </div>
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
