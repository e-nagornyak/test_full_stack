function addLeadingZeros(
  line: number | string,
  length: number,
  position: "padStart" | "padEnd" = "padStart"
) {
  if (typeof line === "string") {
    return line?.[position]?.(length, "0")
  } else {
    return line.toString()?.[position]?.(length, "0")
  }
}

export { addLeadingZeros }
