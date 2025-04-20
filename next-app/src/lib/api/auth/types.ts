import { User } from "next-auth"

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  email: string
  password: string
  name?: string
}

interface AuthResponse {
  user: Pick<User, "id" | "name" | "email">
  token: string
}

export type { LoginRequest, RegisterRequest, AuthResponse }
