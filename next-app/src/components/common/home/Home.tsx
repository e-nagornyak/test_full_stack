import * as React from "react"
import { ArrowRight } from "lucide-react"

import { RoutePaths } from "@/config/routes"
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"

interface HomeProps {
  isAuthenticated?: boolean
}

export function Home({ isAuthenticated }: HomeProps) {
  return (
    <div className="from-background bg-gradient-to-b via-gray-200 via-40% to-transparent dark:via-gray-700">
      <section className="container px-4 py-24 md:py-32">
        <div className="flex flex-col items-center space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Lorem ipsum dolor sit amet.
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi,
            officia.
          </p>
          {isAuthenticated && (
            <Link
              href={RoutePaths.private.repositories.list}
              buttonStyles={{ size: "lg" }}
              variant={"ghost"}
              className="gap-2"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          <div className="relative mt-8 aspect-video w-full max-w-4xl overflow-hidden rounded-xl shadow-xl" />
        </div>
      </section>

      <section className="container px-4 py-24">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 text-center md:p-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="text-primary-foreground/80 mx-auto mb-8 max-w-[700px]">
            Join thousands of satisfied customers building amazing websites
            today.
          </p>
          <Button size="lg" variant="secondary" className="gap-2">
            Start Your Free Trial <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}
