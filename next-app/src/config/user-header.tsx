import { Home, List, LucideIcon } from "lucide-react"

import { RoutePaths } from "@/config/routes"

interface ItemBase {
  icon: LucideIcon
  title: string
  disabled?: boolean
  hidden?: boolean
  prefetch?: boolean
  href: string
}

export const userHeaderConfig: ItemBase[] = [
  {
    title: "Home",
    icon: Home,
    href: RoutePaths.public.home,
    prefetch: true,
  },
  {
    title: "Repositories",
    icon: List,
    href: RoutePaths.private.repositories.list,
    prefetch: true,
  },
]
