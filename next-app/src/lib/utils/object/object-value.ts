/**
 * Checks if any property of the object has a truthy value.
 *
 * @param obj - The object to check.
 * @returns `true` if at least one property has a truthy value, otherwise `false`.
 */
function hasAnyPropertyValue<T extends object>(obj: T): boolean {
  return Object.values(obj).some((value) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return hasAnyPropertyValue(value)
    }
    return Boolean(value)
  })
}

function isEmpty<T extends object>(obj: T): boolean {
  if (obj === null || obj === undefined) {
    return true
  }

  if (typeof obj !== "object") {
    return false
  }

  if (Array.isArray(obj)) {
    return obj.length === 0
  }

  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false
    }
  }

  return true
}

export { hasAnyPropertyValue, isEmpty }
