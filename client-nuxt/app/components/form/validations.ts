import * as z from 'zod'
import type { CheckboxFieldConfig, SelectFieldConfig, TextFieldConfig, TextareaFieldConfig } from './types'

export const validateText = (field: TextFieldConfig) => {
  let fieldSchema: z.ZodString = z.string()
  
  if (field.required) {
    fieldSchema = fieldSchema.min(1, `${field.label} is required`)
  }
  
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
  
  return fieldSchema
}

export const validateTextarea = (field: TextareaFieldConfig) => {
  let fieldSchema: z.ZodString = z.string()
  
  if (field.required) {
    fieldSchema = fieldSchema.min(1, `${field.label} is required`)
  }
  
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
  
  return fieldSchema
}

export const validateCheckbox = (field: CheckboxFieldConfig) => {
  let fieldSchema = z.array(z.string())
  
  if (field.required) {
    fieldSchema = fieldSchema.min(1, `${field.label} is required`)
  }
  
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
  
  return fieldSchema
}

export const validateSelect = (field: SelectFieldConfig) => {
  let fieldSchema = z.string()
  
  if (field.required) {
    fieldSchema = fieldSchema.min(1, `${field.label} is required`)
  }
  
  return fieldSchema
}

export const createFormSchema = (fields: any[]) => {
  const schema: Record<string, z.ZodTypeAny> = {}
  
  for (const field of fields) {
    switch (field.type) {
      case 'text':
        schema[field.name] = validateText(field)
        break
      case 'textarea':
        schema[field.name] = validateTextarea(field)
        break
      case 'checkbox':
        schema[field.name] = validateCheckbox(field)
        break
      case 'select':
        schema[field.name] = validateSelect(field)
        break
    }
  }
  
  return z.object(schema)
} 