import NextAuth from "next-auth"

import { authOptions } from "@/lib/next-auth"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

// Authorize cookie for hasura app https://github.com/nextauthjs/next-auth/issues/405#issuecomment-737593528

const nextAuthOptions = NextAuth(authOptions)

export { nextAuthOptions as GET, nextAuthOptions as POST }
