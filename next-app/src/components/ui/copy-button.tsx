"use client"

import type React from "react"
import { useState } from "react"

import { Text } from "@/components/ui/text"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CopyCouponCodeProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  copyText: string
}

export const CopyButton = ({ copyText, ...props }: CopyCouponCodeProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const onCopyLink = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(copyText)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 700)
  }

  return (
    <Tooltip open={isCopied}>
      <TooltipTrigger asChild>
        <button onClick={onCopyLink} {...props} />
      </TooltipTrigger>
      <TooltipContent className="border border-border bg-card">
        <Text color="highlight">Copied</Text>
      </TooltipContent>
    </Tooltip>
  )
}
