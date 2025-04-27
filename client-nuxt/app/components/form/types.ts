// Field types
export type BaseFieldConfig = {
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

export type TextFieldConfig = BaseFieldConfig & {
  type: 'text'
  placeholder?: string
  inputType?: string // For HTML input types like 'email', 'password', etc.
}

export type TextareaFieldConfig = BaseFieldConfig & {
  type: 'textarea'
  placeholder?: string
  rows?: number
}

export type CheckboxFieldConfig = BaseFieldConfig & {
  type: 'checkbox'
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

export type SelectFieldConfig = BaseFieldConfig & {
  type: 'select'
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

export type FieldConfig = TextFieldConfig | TextareaFieldConfig | CheckboxFieldConfig | SelectFieldConfig 