import { useTransition } from "react"
import { Bug, GitFork, Star } from "lucide-react"

import { Repository } from "@/lib/api/repositories/types"
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { TableCell, TableRow } from "@/components/ui/table"

interface RepositoriesTableRowProps {
  repository: Repository
  //
  onUpdateClick: (id: number) => Promise<void>
  onDeleteClick: (id: number) => Promise<void>
}

export function RepositoriesTableRow({
  repository,
  onUpdateClick,
  onDeleteClick,
}: RepositoriesTableRowProps) {
  const [isPending, startTransition] = useTransition()

  const createdAt = new Date(repository.createdAt).toLocaleDateString()
  const url = repository.url.replace("https://github.com/", "")
  const issueUrl = repository.url + "/issues"

  const name = `${repository.owner}/${repository.name}`

  const onClickUpdate = () => {
    startTransition(async () => {
      await onUpdateClick(repository.id)
    })
  }

  const onClickDelete = () => {
    startTransition(async () => {
      await onDeleteClick(repository.id)
    })
  }

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>
        <Link href={repository.url} target="_blank" rel="noopener noreferrer">
          {url}
        </Link>
      </TableCell>
      <TableCell>
        <div className={"mx-auto flex w-fit items-center gap-2"}>
          {repository.stars} <Star className={"text-orange-500"} size={15} />
        </div>
      </TableCell>
      <TableCell>
        <div className={"mx-auto flex w-fit items-center gap-2"}>
          {repository.forks} <GitFork size={15} />
        </div>
      </TableCell>
      <TableCell>
        <Link
          className={"mx-auto flex w-fit items-center gap-2"}
          href={issueUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repository.issues}
          <Bug size={15} />
        </Link>
      </TableCell>
      <TableCell className={"text-center"}>{createdAt}</TableCell>
      <TableCell>
        <div className={"flex justify-center gap-2"}>
          <Button
            loading={isPending}
            variant={"outline"}
            color={"gray"}
            onClick={onClickUpdate}
          >
            Update
          </Button>
          <Button
            loading={isPending}
            variant={"outline"}
            color={"red"}
            onClick={onClickDelete}
          >
            Remove
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
