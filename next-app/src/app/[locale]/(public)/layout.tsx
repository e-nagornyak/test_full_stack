import { DefaultPublicFooter } from "@/components/layouts/public/default/default-public-footer"
import { DefaultPublicHeader } from "@/components/layouts/public/default/default-public-header"

interface RootLayoutProps extends React.PropsWithChildren {
  params: Promise<{ locale?: string }>
}

export default async function PublicRootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <DefaultPublicHeader />
      <main className="flex min-h-screen flex-1 flex-col">{children}</main>
      <DefaultPublicFooter />
    </>
  )
}
