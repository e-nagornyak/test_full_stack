import { cookies } from "next/headers"
import { env } from "@/env"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { RoutePaths } from "@/config/routes"
import { loginReq } from "@/lib/api/auth/auth-api"
import { ApiRequestError } from "@/lib/api/base/types"

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: RoutePaths.auth.login,
    error: RoutePaths.auth.login,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const response = await loginReq({
            email: credentials.email,
            password: credentials.password,
          })

          if (response.user && response.token) {
            return {
              ...response.user,
              token: response?.token,
            }
          }

          return null
        } catch (error) {
          const message =
            error instanceof ApiRequestError
              ? error?.message
              : "Invalid credentials"

          return Promise.reject({ message })
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && "token" in user && user?.token) {
        token.id = user.id
        token.apiToken = user.token
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.apiToken = token.apiToken as string
      }
      return session
    },
    async signIn({ user }) {
      const token = user?.token

      if (token) {
        const cookieStore = await cookies()
        cookieStore?.set("accessToken", token)
      }
      return !!user
    },
  },
}
