import { env } from "@/env"

class RoutePaths {
  private static readonly baseAuth: string = "/auth"
  private static readonly baseRepositories: string = "/repositories"

  public static readonly auth = {
    login: `${this.baseAuth}/login`,
    register: `${this.baseAuth}/register`,
  }

  public static readonly private = {
    repositories: {
      base: this.baseRepositories,
      list: `${this.baseRepositories}`,
    },
  }

  public static readonly public = {
    home: "/",
  }

  public static getFullPath(path: string): string {
    return `${env.NEXT_PUBLIC_FRONTEND_URL}${path}`
  }
}

export { RoutePaths }
