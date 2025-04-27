<script setup lang="ts">
import { Form } from '@/components/form'
import type { FieldConfig } from '@/components/form'

// Define form fields
const fields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your full name',
    helperText: 'Please enter your full name as it appears on official documents'
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'text',
    inputType: 'email',
    required: true,
    placeholder: 'Enter your email address',
    helperText: 'We will send a verification link to this email'
  },
  {
    name: 'country',
    label: 'Country',
    type: 'select',
    required: true,
    placeholder: 'Select your country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'au', label: 'Australia' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    name: 'interests',
    label: 'Interests',
    type: 'checkbox',
    required: true,
    options: [
      { value: 'sports', label: 'Sports' },
      { value: 'music', label: 'Music' },
      { value: 'art', label: 'Art' },
      { value: 'travel', label: 'Travel' },
      { value: 'technology', label: 'Technology' }
    ],
    helperText: 'Select at least one interest'
  },
  {
    name: 'bio',
    label: 'Bio',
    type: 'textarea',
    placeholder: 'Tell us about yourself',
    helperText: 'Optional: Share something about yourself with the community'
  }
]

// Handle form submission
const handleSubmit = (data: Record<string, any>) => {
  console.log('Form submitted:', data)
  // Handle form submission here
}

// Handle form changes
const handleChange = (data: Record<string, any>) => {
  console.log('Form changed:', data)
}
</script>

<template>
    <div class="container mx-auto py-10">
        <h1 class="text-3xl font-bold mb-8 text-center">Signup Guide</h1>
        
        <Form 
          :fields="fields" 
          submitButtonText="Continue" 
          title="Create Your Account"
          description="Please fill out the form below to get started with your account."
          @submit="handleSubmit"
          @change="handleChange"
        />
    </div>
</template>