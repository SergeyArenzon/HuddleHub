"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FormTextField } from "./FormTextField"
import { FormTextareaField } from "./FormTextareaField"
import { FormDropdownCheckboxField } from "./FormDropdownCheckboxField"

// Field types
type BaseFieldConfig = {
  name: string
  label: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  validation?: {
    min?: number
    max?: number
    pattern?: RegExp
    message?: string
  }
}

type TextFieldConfig = BaseFieldConfig & {
  type: 'text'
  placeholder?: string
  inputType?: string // For HTML input types like 'email', 'password', etc.
}

type TextareaFieldConfig = BaseFieldConfig & {
  type: 'textarea'
  placeholder?: string
  rows?: number
}

type DropdownCheckboxFieldConfig = BaseFieldConfig & {
  type: 'dropdown-checkbox'
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

type FieldConfig = TextFieldConfig | TextareaFieldConfig | DropdownCheckboxFieldConfig

type ModularFormProps = {
  fields: FieldConfig[]
  onSubmit: (data: any) => void
  submitButtonText?: string
  title?: string
  description?: string
}

export default function ModularForm({
  fields,
  onSubmit,
  submitButtonText = "Submit",
  title,
  description
}: ModularFormProps) {
  // Generate Zod schema dynamically based on field configurations
  const generateZodSchema = () => {
    const schemaMap: Record<string, any> = {}

    fields.forEach(field => {
      let fieldSchema: any = z.string()

      if (field.required) {
        fieldSchema = fieldSchema.min(1, `${field.label} is required`)
      }

      if (field.type === 'textarea' || field.type === 'text') {
        if (field.validation?.min) {
          fieldSchema = fieldSchema.min(
            field.validation.min,
            field.validation.message || `${field.label} must be at least ${field.validation.min} characters`
          )
        }
        if (field.validation?.max) {
          fieldSchema = fieldSchema.max(
            field.validation.max,
            field.validation.message || `${field.label} must be at most ${field.validation.max} characters`
          )
        }
        if (field.validation?.pattern) {
          fieldSchema = fieldSchema.regex(
            field.validation.pattern,
            field.validation.message || `${field.label} has an invalid format`
          )
        }
      }

      if (field.type === 'dropdown-checkbox') {
        fieldSchema = z.array(z.string())
        if (field.validation?.min) {
          fieldSchema = fieldSchema.min(
            field.validation.min,
            field.validation.message || `Select at least ${field.validation.min} ${field.label.toLowerCase()}`
          )
        }
        if (field.validation?.max) {
          fieldSchema = fieldSchema.max(
            field.validation.max,
            field.validation.message || `Select at most ${field.validation.max} ${field.label.toLowerCase()}`
          )
        }
      }

      schemaMap[field.name] = fieldSchema
    })

    return z.object(schemaMap)
  }

  const schema = generateZodSchema()
  type FormValues = z.infer<typeof schema>

  // Setup form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = field.type === 'dropdown-checkbox' ? [] : ''
      return acc
    }, {} as Record<string, any>)
  })

  // Handle form submission
  const onSubmitHandler = (data: FormValues) => {
    onSubmit(data)
  }

  // Render field based on type
  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case 'text':
        return (
          <FormTextField
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            helperText={field.helperText}
            register={register}
            errors={errors}
            disabled={field.disabled}
            required={field.required}
            type={field.inputType || 'text'}
          />
        )

      case 'textarea':
        return (
          <FormTextareaField
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            helperText={field.helperText}
            register={register}
            errors={errors}
            disabled={field.disabled}
            required={field.required}
            rows={field.rows}
          />
        )

      case 'dropdown-checkbox':
        return (
          <FormDropdownCheckboxField
            key={field.name}
            name={field.name}
            label={field.label}
            options={field.options}
            placeholder={field.placeholder}
            helperText={field.helperText}
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            disabled={field.disabled}
            required={field.required}
          />
        )

      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full max-w-2xl mx-auto space-y-6 p-4">
      {(title || description) && (
        <div className="space-y-2">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      {fields.map(renderField)}

      <Button type="submit" className="w-full">
        {submitButtonText}
      </Button>
    </form>
  )
}
