"use client"

import type * as React from "react"
import { Input } from "@/components/ui/input"

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function NumberInput({ value, onChange, min, max, ...props }: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === "" ? min || 0 : Number(e.target.value)
    if (min !== undefined && newValue < min) return
    if (max !== undefined && newValue > max) return
    onChange(newValue)
  }

  return <Input type="number" value={value} onChange={handleChange} min={min} max={max} className="w-20" {...props} />
}

