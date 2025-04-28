<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import FormFieldBase from './FormFieldBase.vue'
import SelectDropdown from '../SelectDropdown.vue'
import CheckboxDropdown from '../CheckboxDropdown.vue'
import type { FieldConfig, TextFieldConfig, TextareaFieldConfig, CheckboxFieldConfig, SelectFieldConfig } from './types'

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

const formData = ref<Record<string, any>>({})
const errors = ref<Record<string, string>>({})

// Initialize form data with empty values
for (const field of props.fields) {
  if (field.type === 'checkbox') {
    formData.value[field.name] = []
    console.log(`Initialized checkbox field ${field.name} with:`, formData.value[field.name])
  } else {
    formData.value[field.name] = ''
  }
}

// Handle form submission
const handleSubmit = () => {
  // Reset errors
  errors.value = {}
  
  // Simple validation - just check required fields
  let isValid = true
  for (const field of props.fields) {
    if (field.required) {
      const value = formData.value[field.name]
      if (!value || (Array.isArray(value) && value.length === 0)) {
        errors.value[field.name] = `${field.label} is required`
        isValid = false
      }
    }
  }
  
  if (isValid) {
    emit('submit', formData.value)
  }
}

// Handle input change
const handleChange = (field: string, value: string | string[] | number) => {
  console.log(`Field ${field} changed to:`, value)
  formData.value[field] = value
  console.log(`FormData after change:`, formData.value)
  emit('change', formData.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-full max-w-2xl mx-auto space-y-6 p-4">
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
        :error="errors[field.name]"
        :required="field.required"
      >
        <Input 
          :id="field.name"
          :type="(field as TextFieldConfig).inputType || 'text'"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          v-model="formData[field.name]"
          @update:modelValue="(value: string | number) => handleChange(field.name, value)"
        />
      </FormFieldBase>

      <!-- Textarea Field -->
      <FormFieldBase 
        v-else-if="field.type === 'textarea'"
        :name="field.name"
        :label="field.label"
        :helperText="field.helperText"
        :error="errors[field.name]"
        :required="field.required"
      >
        <Textarea
          :id="field.name"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          v-model="formData[field.name]"
          @update:modelValue="(value: string | number) => handleChange(field.name, value)"
        />
      </FormFieldBase>

      <!-- Select Field -->
      <FormFieldBase 
        v-else-if="field.type === 'select'"
        :name="field.name"
        :label="field.label"
        :helperText="field.helperText"
        :error="errors[field.name]"
        :required="field.required"
      >
        <SelectDropdown 
          :options="(field as SelectFieldConfig).options"
          :placeholder="field.placeholder"
          v-model="formData[field.name]"
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
        :error="errors[field.name]"
        :required="field.required"
      >
        <CheckboxDropdown
          :options="(field as CheckboxFieldConfig).options"
          :label="field.label"
          :placeholder="field.placeholder"
          v-model="formData[field.name]"
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