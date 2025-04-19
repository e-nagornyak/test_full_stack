import { Facebook, Linkedin, Youtube } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { LanguageToggle } from "@/components/shared/language-toggle"
import { ModeSmallToggle } from "@/components/shared/mode-small-toggle"

const footerSections = [
  {
    title: "Functions",
    items: [
      "Functions overview",
      "Order Manager",
      "Marketplace Manager",
      "Product Manager",
      "Price automation",
      "Shipping management",
      "Workflow automation",
      "BaseLinker Connect",
      "AI for e-commerce",
    ],
  },
  {
    title: "Integrations",
    items: ["Amazon", "eBay", "Etsy", "Google", "wooCommerce", "Magento"],
  },
  {
    title: "Service",
    items: [
      "Shopify",
      "OpenCart",
      "Royal Mail Click&Drop",
      "UPS",
      "DHL",
      "DPD",
    ],
  },
  {
    title: "Service",
    items: [
      "Contact",
      "Help",
      "FAQ",
      "Reviews",
      "System implementations",
      "Cooperation and partners",
      "Competitor Comparison",
    ],
  },
]

export function DefaultPublicFooter() {
  return (
    <footer className="border-t border-border px-4 py-8 dark:border-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {footerSections.map((section, index) => (
            <div key={index} className="hidden md:block">
              <h3 className="mb-4 font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Accordion type="single" collapsible className="mt-8 md:hidden">
          {footerSections.map((section, index) => (
            <AccordionItem key={index} value={`section-${index}`}>
              <AccordionTrigger>{section.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200 pt-8 md:flex-row">
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
