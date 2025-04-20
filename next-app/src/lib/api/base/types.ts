interface ApiError {
  message: string
  statusCode?: number
}

class ApiRequestError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.name = "ApiRequestError"
    this.statusCode = statusCode
  }
}

interface PaginatedResponse<T> {
  meta: {
    total: number
    lastPage: number
    currentPage: number
    limit: number
    prev: number | null
    next: number | null
  }
  data: T
}

export { type ApiError, type PaginatedResponse, ApiRequestError }
