"use client"
import { Textarea } from "@/components/ui/textarea"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import { FormFieldBase } from "./FormFieldBase"

export type TextareaFieldProps = {
  name: string
  label: string
  placeholder?: string
  helperText?: string
  register: UseFormRegister<any>
  errors: FieldErrors
  disabled?: boolean
  required?: boolean
  className?: string
  rows?: number
}

export function FormTextareaField({
  name,
  label,
  placeholder,
  helperText,
  register,
  errors,
  disabled = false,
  required = false,
  className = "",
  rows = 6,
}: TextareaFieldProps) {
  return (
    <FormFieldBase
      name={name}
      label={label}
      helperText={helperText}
      errors={errors}
      disabled={disabled}
      required={required}
      className={className}
    >
      <Textarea
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        className={`min-h-[${rows * 24}px]`}
        {...register(name)}
      />
    </FormFieldBase>
  )
}

