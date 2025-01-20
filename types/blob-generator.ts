export type GradientType = "conic" | "linear" | "radial"

export interface BlobConfig {
  numBlobs: number
  blur: number
  size: number
  height: number
  speed: number
  distance: number
  backgroundColor: string
  heading: string
  colors: string[]
  randomizeColors: boolean
  gradientType: GradientType
}

export interface ControlPanelProps {
  config: BlobConfig
  onConfigChange: (config: BlobConfig) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export interface ControlSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  unit?: string
}

export interface ShareButtonProps {
  config: BlobConfig
}


