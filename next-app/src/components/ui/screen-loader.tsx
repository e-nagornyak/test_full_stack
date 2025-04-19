import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { TextLoader } from "@/components/ui/text-loader"

interface ScreenLoaderProps {
  text?: string
}

export function ScreenLoader({ text = "Loading" }: ScreenLoaderProps) {
  return (
    <Dialog open>
      <DialogContent
        className={"flex w-fit flex-col items-center justify-center"}
      >
        <DialogTitle hidden>{text}</DialogTitle>
        <TextLoader size="6xl" text={text} />
      </DialogContent>
    </Dialog>
  )
}
