import { fetchRepositoriesReq } from "@/lib/api/repositories/repositories-api"
import { RepositoriesController } from "@/components/@controllers/repositories/repositories-controller"

export default async function Page() {
  const data = await fetchRepositoriesReq()
  const initialRepositories = data?.data

  return <RepositoriesController initialRepositories={initialRepositories} />
}
