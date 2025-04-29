<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import FormFieldBase from './FormFieldBase.vue'
import SelectDropdown from '../SelectDropdown.vue'
import CheckboxDropdown from '../CheckboxDropdown.vue'
import type { FieldConfig, TextFieldConfig, TextareaFieldConfig, CheckboxFieldConfig, SelectFieldConfig } from './types'
import { ref } from 'vue'
import { createFormSchema } from './validations'

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

// Track form values and errors
const values = ref<Record<string, any>>({})
const errors = ref<Record<string, string>>({})

// Initialize values
props.fields.forEach(field => {
  values.value[field.name] = field.type === 'checkbox' ? [] : ''
})

// Create form schema
const formSchema = createFormSchema(props.fields)

// Validate all fields
const validateForm = (): boolean => {
  try {
    formSchema.parse(values.value)
    errors.value = {}
    return true
  } catch (error: any) {
    if (error.errors) {
      errors.value = error.errors.reduce((acc: Record<string, string>, err: any) => {
        acc[err.path[0]] = err.message
        return acc
      }, {})
    }
    return false
  }
}

// Handle form submission
const onSubmit = () => {
  if (validateForm()) {
    emit('submit', values.value)
  }
}

// Handle input change
const handleChange = (field: string, value: string | string[] | number) => {
  values.value[field] = value
  try {
    formSchema.parse(values.value)
    delete errors.value[field]
  } catch (error: any) {
    if (error.errors) {
      const fieldError = error.errors.find((err: any) => err.path[0] === field)
      if (fieldError) {
        errors.value[field] = fieldError.message
      } else {
        delete errors.value[field]
      }
    }
  }
  emit('change', values.value)
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="w-full max-w-2xl mx-auto space-y-6 p-4">
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
        :required="field.required"
        :error="errors[field.name]"
      >
        <Input 
          :id="field.name"
          :type="(field as TextFieldConfig).inputType || 'text'"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          v-model="values[field.name]"
          @update:modelValue="(value: string | number) => handleChange(field.name, value)"
        />
      </FormFieldBase>

      <!-- Textarea Field -->
      <FormFieldBase 
        v-else-if="field.type === 'textarea'"
        :name="field.name"
        :label="field.label"
        :helperText="field.helperText"
        :required="field.required"
        :error="errors[field.name]"
      >
        <Textarea
          :id="field.name"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          v-model="values[field.name]"
          @update:modelValue="(value: string | number) => handleChange(field.name, value)"
        />
      </FormFieldBase>

      <!-- Select Field -->
      <FormFieldBase 
        v-else-if="field.type === 'select'"
        :name="field.name"
        :label="field.label"
        :helperText="field.helperText"
        :required="field.required"
        :error="errors[field.name]"
      >
        <SelectDropdown 
          :options="(field as SelectFieldConfig).options"
          :placeholder="field.placeholder"
          v-model="values[field.name]"
          :disabled="field.disabled"
          @update:modelValue="(value: string) => handleChange(field.name, value)"
        />
      </FormFieldBase>

      <!-- Checkbox Field -->
      <FormFieldBase 
        v-else-if="field.type === 'checkbox'"
        :name="field.name"
        :label="field.label"
        :helperText="field.helperText"
        :required="field.required"
        :error="errors[field.name]"
      >
        <CheckboxDropdown
          :options="(field as CheckboxFieldConfig).options"
          :label="field.label"
          :placeholder="field.placeholder"
          v-model="values[field.name]"
          :disabled="field.disabled"
          @update:modelValue="(value: string[]) => handleChange(field.name, value)"
        />
      </FormFieldBase>
    </template>

    <Button type="submit" class="w-full">
      {{ submitButtonText || 'Submit' }}
    </Button>
  </form>
</template> 