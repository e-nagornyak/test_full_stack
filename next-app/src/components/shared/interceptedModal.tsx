"use client"

import { type PropsWithChildren } from "react"
import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ModalProps extends PropsWithChildren {
  className?: string
}

export function InterceptedModal({ children, className }: ModalProps) {
  const { back } = useRouter()

  return (
    <Dialog defaultOpen onOpenChange={back}>
      <DialogTrigger className="hidden" />
      <DialogContent className={`pt-10 ${className || ""}`}>
        <DialogTitle hidden>Modal</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  )
}
