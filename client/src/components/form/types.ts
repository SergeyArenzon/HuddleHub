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
  
  type CheckboxDropdownFieldConfig = BaseFieldConfig & {
    type: 'dropdown-checkbox'
    options: Array<{ value: string; label: string }>
    placeholder?: string
  }
  
  type SelectDropdownFieldConfig = BaseFieldConfig & {
    type: 'select-dropdown'
    options: Array<{ value: string; label: string }>
    placeholder?: string
  }
  
  
  
type FieldConfig = TextFieldConfig | TextareaFieldConfig | CheckboxDropdownFieldConfig | SelectDropdownFieldConfig
  
export type { FieldConfig, TextFieldConfig, TextareaFieldConfig, CheckboxDropdownFieldConfig, SelectDropdownFieldConfig }