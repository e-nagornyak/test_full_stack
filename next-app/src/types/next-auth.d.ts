import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
    }
    apiToken: string
  }

  interface User {
    id: string
    email?: string | null
    name?: string | null
    token?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    apiToken: string
  }
}
