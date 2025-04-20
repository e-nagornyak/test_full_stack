import { env } from "@/env"

import { isBrowser, isSSR } from "@/hooks/use-isomorphic-effect"

import { ApiRequestError } from "./types"

async function getToken(): Promise<string | undefined> {
  if (!isSSR && isBrowser) {
    const Cookies = await import("js-cookie")
    return Cookies.default.get("accessToken")
  } else {
    const { cookies } = await import("next/headers")
    const cookiesStore = await cookies()
    return cookiesStore.get("accessToken")?.value
  }
}

/**
 * @param url Request URL
 * @param options Fetch options
 * @param requiresAuth Whether the request requires authentication (default: true)
 * @returns The result of the request in JSON format
 * @throws {ApiRequestError} If authentication fails or request fails
 */
export async function fetchApi<T>(
  url: string,
  options: RequestInit = {},
  requiresAuth: boolean = true
): Promise<T> {
  let headers: HeadersInit = {
    ...options?.headers,
    origin: env.NEXT_PUBLIC_FRONTEND_URL,
  }

  try {
    if (requiresAuth) {
      let token = await getToken()

      if (!token) {
        throw new ApiRequestError("Authentication required", 401)
      }

      const authHeaders = {
        ...headers,
        Authorization: `Bearer ${token}`,
      }

      if (
        options.body &&
        !("Content-Type" in authHeaders) &&
        !(options.body instanceof FormData)
      ) {
        ;(authHeaders as Record<string, string>)["Content-Type"] =
          "application/json"
      }

      headers = {
        ...headers,
        ...authHeaders,
      }
    }

    // Ensure URL uses the backend base URL if it's a relative path
    const fullUrl = url.startsWith("http")
      ? url
      : `${env.NEXT_PUBLIC_BACKEND_URL}${url.startsWith("/") ? "" : "/"}${url}`

    const response = await fetch(fullUrl, { ...options, headers })

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error" }))

      throw new ApiRequestError(
        errorData.message || `Request error: ${response.status}`,
        response.status
      )
    }

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof ApiRequestError) {
      throw error
    }
    throw new ApiRequestError(`Network error: ${(error as Error).message}`)
  }
}
