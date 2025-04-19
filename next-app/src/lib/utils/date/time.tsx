import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

// Register the required plugins
dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * Converts a date from any timezone to the user's local timezone.
 * Automatically detects the timezone from the ISO date string.
 *
 * @param {string} isoDateString - Date in ISO format with timezone (e.g., 2025-04-15T16:27:35.665412+00:00)
 * @param {string} [format='YYYY-MM-DD HH:mm:ss'] - Output date format (optional)
 * @returns {string} - Formatted date in the local timezone
 */
export function convertToLocalTimezone(
  isoDateString: string,
  format: string = "YYYY-MM-DD HH:mm:ss"
): string {
  // Get the local timezone
  const localTimezone: string = dayjs.tz.guess()

  // Convert the date to the local timezone
  return dayjs(isoDateString).tz(localTimezone).format(format)
}

/**
 * Converts a date from any timezone to a specific target timezone.
 *
 * @param {string} isoDateString - Date in ISO format with timezone (e.g., 2025-04-15T16:27:35.665412+00:00)
 * @param {string} targetTimezone - Target timezone (e.g., 'Europe/Kiev')
 * @param {string} [format='YYYY-MM-DD HH:mm:ss'] - Output date format (optional)
 * @returns {string} - Formatted date in the target timezone
 */
export function convertToTimezone(
  isoDateString: string,
  targetTimezone: string,
  format: string = "YYYY-MM-DD HH:mm:ss"
): string {
  return dayjs(isoDateString).tz(targetTimezone).format(format)
}

// /**
//  * Safely formats a date with timezone conversion, handling null, undefined and invalid dates.
//  * Returns a fallback string ("-" by default) for invalid/null/undefined date inputs.
//  *
//  * @param {string | null | undefined} dateInput - Date in ISO format, null, or undefined
//  * @param {string} [format='YYYY-MM-DD HH:mm:ss'] - Output date format
//  * @param {string} [fallback='-'] - String to return if date is invalid/null/undefined
//  * @returns {string} - Formatted date or fallback string
//  */
// export function formatDateSafe(
//   dateInput: string | null | undefined | Date,
//   format: string = "DD.MM.YYYY, HH:mm:ss",
//   fallback: string = "-"
// ): string {
//   // Check if the input is null or undefined
//   if (dateInput === null || dateInput === undefined) {
//     return fallback
//   }
//
//   // Try to parse the date using dayjs
//   const date = dayjs(dateInput)
//
//   // Check if the date is valid
//   if (!date.isValid()) {
//     return fallback
//   }
//
//   // Get the local timezone
//   const localTimezone: string = dayjs.tz.guess()
//
//   // Convert to local timezone and format
//   return date.tz(localTimezone).format(format)
// }

/**
 * Safely formats a date by converting to UTC and then to local timezone.
 * Handles null, undefined, and invalid dates.
 * Returns a fallback string ("-" by default) for invalid/null/undefined date inputs.
 *
 * @param {string | null | undefined | Date} dateInput - Date in ISO format, null, undefined, or Date
 * @param {string} [format='DD.MM.YYYY, HH:mm:ss'] - Output date format
 * @param {string} [fallback='-'] - String to return if date is invalid/null/undefined
 * @returns {string} - Formatted date in local timezone or fallback string
 */
export function formatDateSafe(
  dateInput: string | null | undefined | Date,
  format: string = "DD.MM.YYYY, HH:mm:ss",
  fallback: string = "-"
): string {
  // Check if the input is null or undefined
  if (dateInput === null || dateInput === undefined) {
    return fallback
  }

  // Try to parse the date using dayjs
  const date = dayjs(dateInput)

  // Check if the date is valid
  if (!date.isValid()) {
    return fallback
  }

  // Convert to UTC first, then to local timezone
  const localTimezone: string = dayjs.tz.guess()
  return date.utc().tz(localTimezone).format(format)
}
