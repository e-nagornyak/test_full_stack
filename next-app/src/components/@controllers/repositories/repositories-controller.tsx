"use client"

import { useState } from "react"

import {
  addRepositoryReq,
  deleteRepositoryReq,
  updateRepositoryReq,
} from "@/lib/api/repositories/repositories-api"
import { Repository } from "@/lib/api/repositories/types"
import { showErrorToast } from "@/lib/handle-error"
import { AddRepositoryFormData } from "@/components/common/repositories/add-repository-form/login-validations"
import { Repositories } from "@/components/common/repositories/repositories"

interface RepositoriesControllerProps {
  initialRepositories: Repository[]
}

export function RepositoriesController({
  initialRepositories,
}: RepositoriesControllerProps) {
  const [repositories, setRepositories] = useState<Repository[]>(
    initialRepositories || []
  )
  const [error, setError] = useState<string | null>(null)

  const handleAddRepository = async ({ path }: AddRepositoryFormData) => {
    setError(null)

    try {
      const newRepo = await addRepositoryReq(path)
      setRepositories([newRepo, ...repositories])
    } catch (err: any) {
      showErrorToast(err)
    }
  }

  const handleUpdateRepository = async (id: number) => {
    try {
      const updatedRepo = await updateRepositoryReq(id)
      setRepositories(
        repositories.map((repo) => (repo.id === id ? updatedRepo : repo))
      )
    } catch (err: any) {
      showErrorToast(err)
    }
  }

  const handleDeleteRepository = async (id: number) => {
    try {
      await deleteRepositoryReq(id)
      setRepositories(repositories.filter((repo) => repo.id !== id))
    } catch (err) {
      showErrorToast(err)
    }
  }

  return (
    <Repositories
      repositories={repositories}
      handleAddRepository={handleAddRepository}
      handleDeleteRepository={handleDeleteRepository}
      handleUpdateRepository={handleUpdateRepository}
      error={error}
    />
  )
}
