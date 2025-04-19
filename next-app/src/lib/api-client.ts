import { env } from "@/env"
import { Session } from "next-auth"

export async function fetchRepositories(session: Session | null) {
  if (!session || !session.apiToken) {
    throw new Error("Необхідна аутентифікація")
  }

  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/github-repository`,
    {
      headers: {
        Authorization: `Bearer ${session.apiToken}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Помилка завантаження репозиторіїв")
  }

  return response.json()
}

export async function addRepository(
  session: Session | null,
  repositoryPath: string
) {
  if (!session || !session.apiToken) {
    throw new Error("Необхідна аутентифікація")
  }

  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/github-repository`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.apiToken}`,
      },
      body: JSON.stringify({ repositoryPath }),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Помилка додавання репозиторію")
  }

  return response.json()
}

export async function updateRepository(
  session: Session | null,
  repositoryId: number
) {
  if (!session || !session.apiToken) {
    throw new Error("Необхідна аутентифікація")
  }

  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/github-repository/${repositoryId}`,
    {
      method: "PUT",
      headers: {
        origin: env.NEXT_PUBLIC_FRONTEND_URL,
        Authorization: `Bearer ${session.apiToken}`,
      },
    }
  )
  console.log("response", response)
  if (!response.ok) {
    throw new Error("Помилка оновлення репозиторію")
  }

  return response.json()
}

export async function deleteRepository(
  session: Session | null,
  repositoryId: number
) {
  if (!session || !session.apiToken) {
    throw new Error("Необхідна аутентифікація")
  }

  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/github-repository/${repositoryId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.apiToken}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Помилка видалення репозиторію")
  }

  return response.json()
}
