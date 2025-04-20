"use client"

import * as React from "react"
import { type User } from "next-auth"

import { RoutePaths } from "@/config/routes"
import { cn } from "@/lib/cn"
import { Link } from "@/components/ui/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Title } from "@/components/ui/title"
import { Logo } from "@/components/shared/logo"

interface NavListProps {
  user?: User
}

export function NavList({ user }: NavListProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={"text-black dark:text-white"}>
            Getting started
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-full gap-3 p-6 sm:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="border-border row-span-3 lg:border-r">
                <NavigationMenuItem className="flex size-full flex-col justify-end rounded-md p-3 outline-hidden select-none focus:shadow-md lg:p-6">
                  <Logo />
                  <Title size="xs" className="mt-4 mb-2 font-medium">
                    Lorem ipsum dolor.
                  </Title>
                  <p className="text-muted-foreground hidden text-sm leading-tight sm:inline">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Accusantium asperiores cumque dolor eius inventore tempore.
                  </p>
                </NavigationMenuItem>
              </li>
              {user && (
                <ListItem
                  href={RoutePaths.private.repositories.list}
                  title="View repositories"
                >
                  Here you can view the list of repositories you have access to.
                </ListItem>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          variant="ghost"
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            className
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 hidden text-sm leading-snug sm:inline">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
