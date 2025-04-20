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

export { type Repository }
