import { Repository } from "@/lib/api/repositories/types"
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { RepositoriesTableRow } from "@/components/common/repositories/repositories-table/repositories-table-row"

interface RepositoriesTableProps {
  repositories: Repository[]
  //
  handleUpdateRepository: (id: number) => Promise<void>
  handleDeleteRepository: (id: number) => Promise<void>
}

export function RepositoriesTable({
  repositories,
  handleUpdateRepository,
  handleDeleteRepository,
}: RepositoriesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell className="text-left">Owner/Name</TableCell>
          <TableCell className="text-left">URL</TableCell>
          <TableCell className="text-center">Stars</TableCell>
          <TableCell className="text-center">Forks</TableCell>
          <TableCell className="text-center">Issues</TableCell>
          <TableCell className="text-center">Created</TableCell>
          <TableCell className="text-center">Actions</TableCell>
        </TableRow>
      </TableHeader>
      <tbody>
        {repositories.length ? (
          repositories.map((repository) => (
            <RepositoriesTableRow
              key={repository.id}
              repository={repository}
              onUpdateClick={handleUpdateRepository}
              onDeleteClick={handleDeleteRepository}
            />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No repositories added
            </TableCell>
          </TableRow>
        )}
      </tbody>
    </Table>
  )
}
