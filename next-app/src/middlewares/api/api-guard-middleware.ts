function apiGuardMiddleware(req: Request) {
  // todo: add some api key check
  const token = req.headers.get("accessToken")?.split(" ")[1]

  if (!token) {
    return { isValid: false }
  }

  return { isValid: true }
}

export { apiGuardMiddleware }
