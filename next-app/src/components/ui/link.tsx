"use client"

import * as React from "react"
import NextLink from "next/link"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/cn"
import { buttonVariants } from "@/components/ui/button"

const linkVariants = cva("cursor-pointer", {
  variants: {
    variant: {
      default: "text-highlight hover:underline dark:text-highlight",
      ghost: "",
    },
  },
  defaultVariants: { variant: "default" },
})

interface LinkProps extends VariantProps<typeof linkVariants> {
  buttonStyles?: Partial<VariantProps<typeof buttonVariants>>
}

const Link = React.forwardRef<
  React.ElementRef<typeof NextLink>,
  React.ComponentPropsWithoutRef<typeof NextLink> & LinkProps
>(({ buttonStyles, className, variant, ...rest }, ref) => (
  <NextLink
    ref={ref}
    className={cn(
      linkVariants({ variant }),
      buttonStyles && buttonVariants(buttonStyles),
      className
    )}
    {...rest}
  />
))
Link.displayName = NextLink.displayName

export { Link }
