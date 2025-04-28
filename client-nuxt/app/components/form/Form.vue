<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import FormFieldBase from './FormFieldBase.vue'
import SelectDropdown from '../SelectDropdown.vue'
import CheckboxDropdown from '../CheckboxDropdown.vue'
import type { FieldConfig, TextFieldConfig, TextareaFieldConfig, CheckboxFieldConfig, SelectFieldConfig } from './types'
import { useForm } from 'vee-validate'
import { createFormSchema } from './validations'
import { toTypedSchema } from '@vee-validate/zod'
import { ref } from 'vue'

const props = defineProps<{
  fields: FieldConfig[]
  submitButtonText?: string
  title?: string
  description?: string
}>()

const emit = defineEmits<{
  (e: 'submit', data: Record<string, any>): void
  (e: 'change', data: Record<string, any>): void
}>()

// Track which fields have been blurred
const blurredFields = ref<Record<string, boolean>>({})

// Initialize blurred fields
props.fields.forEach(field => {
  blurredFields.value[field.name] = false
})

// Create the validation schema
const validationSchema = toTypedSchema(createFormSchema(props.fields))

// Initialize form with vee-validate
const { handleSubmit, errors, values, setFieldValue } = useForm({
  validationSchema,
  initialValues: props.fields.reduce((acc, field) => {
    acc[field.name] = field.type === 'checkbox' ? [] : ''
    return acc
  }, {} as Record<string, any>),
  validateOnMount: false,
  validateOnBlur: true,
  validateOnChange: false
})

// Handle form submission
const onSubmit = handleSubmit((values) => {
  // Mark all fields as blurred on submit
  props.fields.forEach(field => {
    blurredFields.value[field.name] = true
  })
  emit('submit', values)
})

// Handle input change
const handleChange = (field: string, value: string | string[] | number) => {
  setFieldValue(field, value)
  emit('change', values)
}

// Handle field blur
const handleBlur = (fieldName: string) => {
  blurredFields.value[fieldName] = true
}

// Helper to check if field should show error
const shouldShowError = (fieldName: string) => {
  return blurredFields.value[fieldName]
}
</script>

<template>
  <form @submit="onSubmit" class="w-full max-w-2xl mx-auto space-y-6 p-4">
    <div v-if="title || description" class="space-y-2">
      <h2 v-if="title" class="text-2xl font-bold">{{ title }}</h2>
      <p v-if="description" class="text-muted-foreground">{{ description }}</p>
    </div>

    <template v-for="field in fields" :key="field.name">
      <!-- Text Field -->
      <FormFieldBase 
        v-if="field.type === 'text'"
        :name="field.name"
        :label="field.label"
        :helperText="field.helperText"
        :error="shouldShowError(field.name) ? errors[field.name] : undefined"
        :required="field.required"
      >
        <Input 
          :id="field.name"
          :type="(field as TextFieldConfig).inputType || 'text'"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          v-model="values[field.name]"
          @update:modelValue="(value: string | number) => handleChange(field.name, value)"
          @blur="handleBlur(field.name)"
        />
      </FormFieldBase>

      <!-- Textarea Field -->
      <FormFieldBase 
        v-else-if="field.type === 'textarea'"
        :name="field.name"
        :label="field.label"
        :helperText="field.helperText"
        :error="shouldShowError(field.name) ? errors[field.name] : undefined"
        :required="field.required"
      >
        <Textarea
          :id="field.name"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          v-model="values[field.name]"
          @update:modelValue="(value: string | number) => handleChange(field.name, value)"
          @blur="handleBlur(field.name)"
        />
      </FormFieldBase>

      <!-- Select Field -->
      <FormFieldBase 
        v-else-if="field.type === 'select'"
        :name="field.name"
        :label="field.label"
        :helperText="field.helperText"
        :error="shouldShowError(field.name) ? errors[field.name] : undefined"
        :required="field.required"
      >
        <SelectDropdown 
          :options="(field as SelectFieldConfig).options"
          :placeholder="field.placeholder"
          v-model="values[field.name]"
          :disabled="field.disabled"
          @update:modelValue="(value: string) => handleChange(field.name, value)"
          @blur="handleBlur(field.name)"
        />
      </FormFieldBase>

      <!-- Checkbox Field -->
      <FormFieldBase 
        v-else-if="field.type === 'checkbox'"
        :name="field.name"
        :label="field.label"
        :helperText="field.helperText"
        :error="shouldShowError(field.name) ? errors[field.name] : undefined"
        :required="field.required"
      >
        <CheckboxDropdown
          :options="(field as CheckboxFieldConfig).options"
          :label="field.label"
          :placeholder="field.placeholder"
          v-model="values[field.name]"
          :disabled="field.disabled"
          @update:modelValue="(value: string[]) => handleChange(field.name, value)"
          @blur="handleBlur(field.name)"
        />
      </FormFieldBase>
    </template>

    <Button type="submit" class="w-full">
      {{ submitButtonText || 'Submit' }}
    </Button>
  </form>
</template> 