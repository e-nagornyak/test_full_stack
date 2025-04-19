import * as React from "react"
import { type ComponentProps } from "react"

import { Text } from "@/components/ui/text"

interface TextLoaderProps extends ComponentProps<typeof Text> {
  text?: string
}

export function TextLoader({ text = "Loading", ...rest }: TextLoaderProps) {
  return (
    <Text {...rest}>
      {text}
      {["delay-100", "delay-200", "delay-300"]?.map((delay) => (
        <span
          key={delay}
          className={`animate-in fade-in repeat-infinite ${delay} duration-700`}
        >
          .
        </span>
      ))}
    </Text>
  )
}
