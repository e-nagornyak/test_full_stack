import "server-only"

import { getServerSession, type User } from "next-auth"

import { authOptions } from "@/lib/next-auth"

const getCurrentUser = async (): Promise<User | null> => {
  const session = await getServerSession(authOptions)
  return session?.user || null
}

export { getCurrentUser }
