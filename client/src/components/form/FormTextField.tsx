"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { UseFormRegister, FieldErrors } from "react-hook-form"

export type TextFieldProps = {
  name: string
  label: string
  placeholder?: string
  helperText?: string
  register: UseFormRegister<any>
  errors: FieldErrors
  disabled?: boolean
  required?: boolean
  className?: string
  type?: string
}

export function FormTextField({
  name,
  label,
  placeholder,
  helperText,
  register,
  errors,
  disabled = false,
  required = false,
  className = "",
  type = "text",
}: TextFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={name} className="flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input id={name} type={type} placeholder={placeholder} disabled={disabled} {...register(name)} />
      {errors[name] && <p className="text-sm text-red-500">{errors[name]?.message as string}</p>}
      {helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
    </div>
  )
}

