import React, { type PropsWithChildren } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/cn"

type TextSize = "p" | "span"

export const textVariants = cva("", {
  variants: {
    size: {
      xxs: "flexible-text-[11px]", // font-size: 10px, line-height: 13px
      xs: "flexible-text-[12px]", // font-size: 12px, line-height: 16px
      sm: "flexible-text-[14px]", // font-size: 14px, line-height: 20px
      base: "flexible-text-[16px]", // font-size: 16px, line-height: 24px
      lg: "flexible-text-[18px]", // font-size: 18px, line-height: 28px
      xl: "flexible-text-[20px]", // font-size: 20px, line-height: 28px
      "2xl": "flexible-text-[24px]", // font-size: 24px, line-height: 32px
      "3xl": "flexible-text-[30px]", // font-size: 30px, line-height: 36px
      "4xl": "flexible-text-[36px]", // font-size: 36px, line-height: 40px
      "5xl": "flexible-text-[48px]", // font-size: 48px, line-height: 1
      "6xl": "flexible-text-[60px]", // font-size: 60px, line-height: 1
      "7xl": "flexible-text-[72px]", // font-size: 72px, line-height: 1
      "8xl": "flexible-text-[96px]", // font-size: 96px, line-height: 1
      "9xl": "flexible-text-[128px]", // font-size: 128px, line-height: 1
    },
    weight: {
      thin: "font-thin", // font-weight: 100
      extralight: "font-extralight", // font-weight: 200
      light: "font-light", // font-weight: 300
      normal: "font-normal", // font-weight: 400
      medium: "font-medium", // font-weight: 500
      semibold: "font-semibold", // font-weight: 600
      bold: "font-bold", // font-weight: 700
      extrabold: "font-extrabold", // font-weight: 800
      black: "font-black", // font-weight: 900
    },
    leading: {
      3: "leading-3", // line-height: .75rem; /* 12px */
      4: "leading-4", // line-height: 1rem; /* 16px */
      5: "leading-5", // line-height: 1.25rem; /* 20px */
      6: "leading-6", // line-height: 1.5rem; /* 24px */
      7: "leading-7", // line-height: 1.75rem; /* 28px */
      8: "leading-8", // line-height: 2rem; /* 32px */
      9: "leading-9", // line-height: 2.25rem; /* 36px */
      10: "leading-10", // line-height: 2.5rem; /* 40px */
      none: "leading-none", // line-height: 1;
      tight: "leading-tight", // line-height: 1.25;
      snug: "leading-snug", // line-height: 1.375;
      normal: "leading-normal", // line-height: 1.5;
      relaxed: "leading-relaxed", // line-height: 1.625;
      loose: "leading-loose", // line-height: 2;
    },
    color: {
      muted: "text-muted-foreground",
      default: "text-black dark:text-white",
      reverse: "text-white dark:text-black",
      highlight: "text-highlight",
      inherit: "text-inherit",
    },
  },
  defaultVariants: {
    color: "default",
    size: "base",
    weight: "normal",
  },
})

interface TextProps
  extends PropsWithChildren,
    VariantProps<typeof textVariants> {
  element?: TextSize
  className?: string
}

export const Text = ({
  children,
  weight,
  size,
  color,
  leading,
  element = "p",
  className,
}: TextProps) => {
  const mapTagBySize: { [key in TextSize]: string } = {
    p: "p",
    span: "span",
  } as const

  return React.createElement(
    mapTagBySize[element],
    {
      className: cn(textVariants({ weight, leading, size, color }), className),
    },
    children
  )
}
