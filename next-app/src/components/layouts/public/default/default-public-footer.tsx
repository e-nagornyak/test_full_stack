import { Facebook, Linkedin, Youtube } from "lucide-react"

import { LanguageToggle } from "@/components/shared/language-toggle"
import { ModeSmallToggle } from "@/components/shared/mode-small-toggle"

export function DefaultPublicFooter() {
  return (
    <footer className="border-border border-t p-4 md:px-8 dark:border-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between border-t border-gray-200 pt-4 md:flex-row">
          <p className="mb-4 text-sm md:mb-0">&copy; 2025 </p>
          <nav className="mb-4 flex space-x-4 md:mb-0">
            <a href="#" className="text-sm hover:underline">
              Terms of Use
            </a>
            <a href="#" className="text-sm hover:underline">
              Security and privacy policy
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <a href="#" aria-label="Facebook">
                <Facebook className="size-5" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="size-5" />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube className="size-5" />
              </a>
            </div>
            <LanguageToggle />
            <ModeSmallToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
