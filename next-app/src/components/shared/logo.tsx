import { RoutePaths } from "@/config/routes"
import { siteConfig } from "@/config/site"
import { Link } from "@/components/ui/link"
import { Title, type TitleProps } from "@/components/ui/title"

interface LogoProps {
  href?: string
  size?: TitleProps["size"]
  className?: string
}

export function Logo({
  size = "xl",
  href = RoutePaths.public.home,
  className,
}: LogoProps) {
  return (
    <Link className={className} variant="ghost" href={href}>
      <Title size={size} className="font-bold">
        {siteConfig.name}
      </Title>
    </Link>
  )
}
