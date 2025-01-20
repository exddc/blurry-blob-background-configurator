export function generateRandomColor(): string {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  )
}

export function distributeColors(colors: string[], numBlobs: number): string[] {
  const result: string[] = []
  for (let i = 0; i < numBlobs; i++) {
    // Get two colors evenly spaced across the input colors array
    const color1 = colors[Math.floor((i * colors.length) / numBlobs) % colors.length]
    const color2 = colors[Math.floor(((i + 1) * colors.length) / numBlobs) % colors.length]
    result.push(color1, color2)
  }
  return result
}

