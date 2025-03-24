import * as z from "zod"
import {  CheckboxDropdownFieldConfig, TextFieldConfig } from "./types";



const validateText = (field: TextFieldConfig) => {
    let fieldSchema: z.ZodString = z.string();
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
    return fieldSchema;
      
}

const validateCheckboxDropdown = (field: CheckboxDropdownFieldConfig) => {
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



export { validateText, validateCheckboxDropdown };