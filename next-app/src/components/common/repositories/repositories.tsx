import { SubmitHandler } from "react-hook-form"

import { Repository } from "@/lib/api/repositories/types"
import { Button } from "@/components/ui/button"
import { Title } from "@/components/ui/title"
import { AddRepositoryForm } from "@/components/common/repositories/add-repository-form/add-repository-form"
import { AddRepositoryFormData } from "@/components/common/repositories/add-repository-form/login-validations"
import { RepositoriesTable } from "@/components/common/repositories/repositories-table/repositories-table"

interface RepositoriesProps {
  repositories: Repository[]
  error: string | null
  //
  handleAddRepository: SubmitHandler<AddRepositoryFormData>
  handleUpdateRepository: (id: number) => Promise<void>
  handleDeleteRepository: (id: number) => Promise<void>
}

export function Repositories({
  repositories,
  handleAddRepository,
  handleDeleteRepository,
  handleUpdateRepository,
  error,
}: RepositoriesProps) {
  return (
    <div className="container mx-auto p-4">
      <Title size={"lg"} weight={"bold"} className="mb-6">
        My repositories
      </Title>

      <AddRepositoryForm onSubmit={handleAddRepository} error={error} />

      <div className="overflow-x-auto">
        <RepositoriesTable
          repositories={repositories}
          handleDeleteRepository={handleDeleteRepository}
          handleUpdateRepository={handleUpdateRepository}
        />
      </div>
    </div>
  )
}
