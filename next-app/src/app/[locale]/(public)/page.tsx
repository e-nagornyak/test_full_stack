"use memo"

import * as React from "react"

import { getCurrentUser } from "@/lib/auth/current-user"
import { HomeAsyncController } from "@/components/@controllers/home/home-async-controller"

export default async function Page() {
  const user = await getCurrentUser()

  return <HomeAsyncController user={user} />
}
