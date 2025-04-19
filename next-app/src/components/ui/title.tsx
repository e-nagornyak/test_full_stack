import React, { type PropsWithChildren } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/cn"

const titleVariants = cva("", {
  variants: {
    color: {
      default: "text-black dark:text-white",
      highlight: "text-highlight",
    },
    size: {
      xs: "flexible-text-[16px]",
      sm: "flexible-text-[22px]",
      md: "flexible-text-[26px]",
      lg: "flexible-text-[32px]",
      xl: "flexible-text-[40px]",
      "2xl": "flexible-text-[48px]",
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
      "3": "leading-3", // line-height: .75rem; /* 12px */
      "4": "leading-4", // line-height: 1rem; /* 16px */
      "5": "leading-5", // line-height: 1.25rem; /* 20px */
      "6": "leading-6", // line-height: 1.5rem; /* 24px */
      "7": "leading-7", // line-height: 1.75rem; /* 28px */
      "8": "leading-8", // line-height: 2rem; /* 32px */
      "9": "leading-9", // line-height: 2.25rem; /* 36px */
      "10": "leading-10", // line-height: 2.5rem; /* 40px */
      none: "leading-none", // line-height: 1;
      tight: "leading-tight", // line-height: 1.25;
      snug: "leading-snug", // line-height: 1.375;
      normal: "leading-normal", // line-height: 1.5;
      relaxed: "leading-relaxed", // line-height: 1.625;
      loose: "leading-loose", // line-height: 2;
    },
  },
  defaultVariants: {
    color: "default",
    size: "sm",
    weight: "normal",
    leading: "normal", // Додаємо дефолтний варіант для висоти рядка
  },
})

export interface TitleProps
  extends PropsWithChildren,
    VariantProps<typeof titleVariants> {
  className?: string
}

export const Title = ({
  children,
  size = "sm",
  leading,
  weight,
  color,
  className,
}: TitleProps) => {
  const mapTagBySize = {
    xs: "h5",
    sm: "h4",
    md: "h3",
    lg: "h2",
    xl: "h1",
    "2xl": "h1",
  } as const

  return React.createElement(
    mapTagBySize[size || "sm"],
    {
      className: cn(titleVariants({ size, color, leading, weight }), className),
    },
    children
  )
}
