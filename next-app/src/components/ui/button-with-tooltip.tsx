import * as React from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ButtonWithTooltipProps extends ButtonProps {
  helperText: string
  delayDuration?: number
}

export const ButtonWithTooltip = React.forwardRef<
  HTMLButtonElement,
  ButtonWithTooltipProps
>(({ delayDuration = 300, helperText, ...props }, ref) => {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>
        <Button ref={ref} {...props} />
      </TooltipTrigger>
      <TooltipContent>
        <Text size={"xs"} color={"reverse"}>
          {helperText}
        </Text>
      </TooltipContent>
    </Tooltip>
  )
})
ButtonWithTooltip.displayName = "ButtonWithTooltip"
