import { type BlobConfig } from "../types/blob-generator"

export function generateCode(config: BlobConfig): string {
  const getGradient = (startColor: string, endColor: string) => {
    switch (config.gradientType) {
      case 'linear':
        return `linear-gradient(45deg, ${startColor} 0%, ${endColor} 100%)`
      case 'radial':
        return `radial-gradient(circle at 50% 50%, ${startColor} 0%, ${endColor} 100%)`
      case 'conic':
      default:
        return `conic-gradient(from 90deg at 50% 50%, ${startColor} 0%, ${endColor} 100%)`
    }
  }

  return `<main className="flex flex-col items-center justify-center min-h-screen relative" style={{ backgroundColor: '${config.backgroundColor}' }}>
  <div className="relative">
    <div className="flex h-[${config.height}px] blur-[${config.blur}px]">
      ${Array.from({ length: config.numBlobs })
        .map(
          (_, i) => `<div
        className="animate-[spin_${config.speed * (i + 1)}s_linear_infinite]"
        style={{
          background: '${getGradient(config.colors[i * 2] || config.colors[0], config.colors[i * 2 + 1] || config.colors[1])}',
          width: '${config.size}px',
          height: '100%',
          marginLeft: '${i === 0 ? 0 : `-${config.distance}px`}'
        }}
      />`
        )
        .join("\n      ")}
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <h1 className="text-4xl font-semibold text-center tracking-tight z-10">
        ${config.heading}
      </h1>
    </div>
  </div>
</main>`
}

