/**
 * Filters out empty values from an object
 * @param params Object to filter
 * @returns New object with only non-empty values
 */
const filterEmptyValues = <T extends object>(
  params: Partial<T>
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value != null)
  ) as Partial<T>
}

export { filterEmptyValues }
