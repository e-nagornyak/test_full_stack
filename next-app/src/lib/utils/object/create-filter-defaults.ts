type OptionalFilter<T> = {
  [K in keyof T]?: T[K] | null | undefined
}

function createFilterObject<T extends object>(
  filter: OptionalFilter<T> | undefined,
  keys: (keyof T)[]
): { [K in keyof T]: T[K] | null } {
  return keys.reduce(
    (acc, key) => {
      acc[key] = filter?.[key] ?? null
      return acc
    },
    {} as { [K in keyof T]: T[K] | null }
  )
}

export { createFilterObject }
