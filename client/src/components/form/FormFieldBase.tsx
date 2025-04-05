"use client"

import type * as React from "react"
import { Label } from "@/components/ui/label"
import type { FieldErrors } from "react-hook-form"

export type FormFieldBaseProps = {
  name: string
  label: string
  helperText?: string
  errors: FieldErrors
  required?: boolean
  className?: string
  children: React.ReactNode
}

export function FormFieldBase({
  name,
  label,
  helperText,
  errors,
  required = false,
  className = "",
  children,
}: FormFieldBaseProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={name} className="flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      
      {children}

      {errors[name] && <p className="text-sm text-red-500">{errors[name]?.message as string}</p>}
      {!errors[name]  && helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
    </div>
  )
}

