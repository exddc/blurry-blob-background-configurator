import type { BlobConfig } from "@/types/blob-generator"

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
    blur: 80,
    size: 170,
    height: 170,
    speed: 5,
    distance: 50,
    backgroundColor: "#ffffff",
    heading: "Animated Blurry Blob Background",
    colors: ["#F76363", "#3D65F5", "#C11A1A", "#002AC4"],
    randomizeColors: false,
    gradientType: "conic",
    codeType: "react",
    opacity: 100,
    yDistance: 0,
  }
}

