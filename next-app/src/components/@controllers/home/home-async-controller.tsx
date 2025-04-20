import { User } from "next-auth"

import { Home } from "@/components/common/home/Home"

interface HomeAsyncControllerProps {
  user: User | null
}

export function HomeAsyncController({ user }: HomeAsyncControllerProps) {
  return <Home isAuthenticated={!!user} />
}
