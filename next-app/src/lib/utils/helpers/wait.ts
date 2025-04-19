export const wait = (time = 1000) => {
  if (process.env.NODE_ENV !== "development") {
    return
  }
  return new Promise((resolve) => setTimeout(resolve, time))
}
