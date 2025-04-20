import { type PaginatedResponse } from "@/lib/api/base/types"

import { fetchApi } from "../base/api-client"
import type { Repository } from "./types"

const base = "/github-repository"

export const paths = {
  base,
  byId: (id: number) => `${base}/${id}`,
}

export function fetchRepositoriesReq(): Promise<
  PaginatedResponse<Repository[]>
> {
  return fetchApi(paths.base)
}

export function addRepositoryReq(repositoryPath: string): Promise<Repository> {
  return fetchApi(paths.base, {
    method: "POST",
    body: JSON.stringify({ repositoryPath }),
    headers: { "Content-Type": "application/json" },
  })
}

export function updateRepositoryReq(repositoryId: number): Promise<Repository> {
  return fetchApi(paths.byId(repositoryId), {
    method: "PUT",
  })
}

export function deleteRepositoryReq(
  repositoryId: number
): Promise<{ success: boolean; message?: string }> {
  return fetchApi(paths.byId(repositoryId), {
    method: "DELETE",
  })
}
