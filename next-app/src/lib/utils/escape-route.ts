// Escape для RegExp
export const escapeRoute = (route: string) =>
  route.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
