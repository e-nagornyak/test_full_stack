import { env } from "@/env"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

import { RoutePaths } from "@/config/routes"

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: RoutePaths.auth.login,
    error: RoutePaths.auth.login,
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          // const response = await fetch(
          //   `${env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       email: credentials.email,
          //       password: credentials.password,
          //     }),
          //   }
          // )

          // const data = await response.json()
          const response = {
            ok: true,
            data: {
              user: {
                id: 1,
                email: "test@gmail.com",
                name: "name",
              },
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3NDUwNzc2NzMsImV4cCI6MTc0NTE2NDA3M30.3P9XmQb8fHUfSg_wvWH_e5z0q8GdTNVYl3pRyIw7IN4",
            },
          }
          const data = response.data

          if (response.ok && data.token) {
            return {
              id: data.user.id.toString(),
              email: data.user.email,
              name: data.user.name,
              // image: data.user.image,
              token: data.token,
            }
          }

          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && account.provider === "github" && user) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/github`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                accessToken: account.access_token,
                providerAccountId: account.providerAccountId,
                email: user.email,
                name: user.name,
                image: user.image,
              }),
            }
          )

          const data = await response.json()

          if (response.ok && data.token) {
            token.id = data.user.id
            token.apiToken = data.token
          }
        } catch (error) {
          console.error("GitHub auth error:", error)
        }
      }

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
  },
}
