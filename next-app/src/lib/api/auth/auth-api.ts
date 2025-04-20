import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/lib/api/auth/types"

import { fetchApi } from "../base/api-client"

const base = "/auth"

export const paths = {
  login: `${base}/login`,
  register: `${base}/register`,
}

export function loginReq(data: LoginRequest): Promise<AuthResponse> {
  return fetchApi(
    paths.login,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    },
    false
  )
}

export function registerReq(data: RegisterRequest): Promise<AuthResponse> {
  return fetchApi(
    paths.register,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    },
    false
  )
}
