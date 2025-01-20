import { type BlobConfig } from "../types/blob-generator"

export function encodeConfig(config: BlobConfig): string {
  return encodeURIComponent(JSON.stringify(config))
}

export function decodeConfig(encoded: string): BlobConfig {
  try {
    return JSON.parse(decodeURIComponent(encoded))
  } catch {
    return getDefaultConfig()
  }
}

export function getDefaultConfig(): BlobConfig {
  return {
    numBlobs: 2,
    blur: 120,
    size: 300,
    height: 150,
    speed: 5,
    distance: 100,
    backgroundColor: "#ffffff",
    heading: "Your Heading Here",
    colors: ["#F76363", "#3D65F5", "#C11A1A", "#002AC4"],
    randomizeColors: false,
    gradientType: 'conic'
  }
}

