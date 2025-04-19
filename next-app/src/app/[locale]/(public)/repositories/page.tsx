// app/repositories/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

import {
  addRepository,
  deleteRepository,
  fetchRepositories,
  updateRepository,
} from "@/lib/api-client"

interface Repository {
  id: number
  owner: string
  name: string
  url: string
  stars: number
  forks: number
  issues: number
  createdAt: string
  updatedAt: string
}

export default function RepositoriesPage() {
  const { data: session } = useSession()
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newRepoPath, setNewRepoPath] = useState("")
  const [adding, setAdding] = useState(false)

  // Завантаження репозиторіїв
  useEffect(() => {
    async function loadRepositories() {
      try {
        if (session) {
          const data = await fetchRepositories(session)
          console.log("data", data)
          setRepositories(data?.data)
        }
      } catch (err) {
        setError("Помилка завантаження репозиторіїв")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadRepositories()
  }, [session])

  // Додавання нового репозиторію
  const handleAddRepository = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdding(true)
    setError(null)

    try {
      const newRepo = await addRepository(session, newRepoPath)
      setRepositories([newRepo, ...repositories])
      setNewRepoPath("")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setAdding(false)
    }
  }

  // Оновлення репозиторію
  const handleUpdateRepository = async (id: number) => {
    try {
      const updatedRepo = await updateRepository(session, id)
      setRepositories(
        repositories.map((repo) => (repo.id === id ? updatedRepo : repo))
      )
    } catch (err: any) {
      setError(err.message)
    }
  }

  // Видалення репозиторію
  const handleDeleteRepository = async (id: number) => {
    try {
      await deleteRepository(session, id)
      setRepositories(repositories.filter((repo) => repo.id !== id))
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <div className="p-10 text-center">Завантаження...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Мої GitHub Репозиторії</h1>

      {/* Форма додавання нового репозиторію */}
      <form onSubmit={handleAddRepository} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newRepoPath}
            onChange={(e) => setNewRepoPath(e.target.value)}
            placeholder="власник/назва-репозиторію (наприклад: facebook/react)"
            className="flex-1 rounded border p-2"
            required
          />
          <button
            type="submit"
            disabled={adding}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
          >
            {adding ? "Додавання..." : "Додати репозиторій"}
          </button>
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>

      {/* Список репозиторіїв */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="">
              <th className="border px-4 py-2 text-left">Власник/Назва</th>
              <th className="border px-4 py-2 text-left">URL</th>
              <th className="border px-4 py-2 text-center">Stars</th>
              <th className="border px-4 py-2 text-center">Forks</th>
              <th className="border px-4 py-2 text-center">Issues</th>
              <th className="border px-4 py-2 text-left">Створено</th>
              <th className="border px-4 py-2 text-center">Дії</th>
            </tr>
          </thead>
          <tbody>
            {repositories.length === 0 ? (
              <tr>
                <td colSpan={7} className="border px-4 py-4 text-center">
                  Немає доданих репозиторіїв
                </td>
              </tr>
            ) : (
              repositories.map((repo) => (
                <tr key={repo.id}>
                  <td className="border px-4 py-2">
                    {repo.owner}/{repo.name}
                  </td>
                  <td className="border px-4 py-2">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {repo.url.replace("https://github.com/", "")}
                    </a>
                  </td>
                  <td className="border px-4 py-2 text-center">{repo.stars}</td>
                  <td className="border px-4 py-2 text-center">{repo.forks}</td>
                  <td className="border px-4 py-2 text-center">
                    {repo.issues}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(repo.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      type={"button"}
                      onClick={() => handleUpdateRepository(repo.id)}
                      className="mr-2 rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600"
                    >
                      Оновити
                    </button>
                    <button
                      type={"button"}
                      onClick={() => handleDeleteRepository(repo.id)}
                      className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
