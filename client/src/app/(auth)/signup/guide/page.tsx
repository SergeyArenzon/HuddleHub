"use client"

import Form from "@/components/form"

const categories = [
  { value: "technology", label: "Technology" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "finance", label: "Finance" },
  { value: "entertainment", label: "Entertainment" },
]

const languages = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "chinese", label: "Chinese" },
  { value: "japanese", label: "Japanese" },
  { value: "russian", label: "Russian" },
  { value: "arabic", label: "Arabic" },
]

export default function SignupGuide() {
  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data)
    // Handle form submission here
  }

  return (
    <Form
      title="Profile Information"
      description="Complete your profile information below"
      fields={[
        {
          type: "text",
          name: "name",
          label: "Full Name",
          placeholder: "Enter your full name",
          required: true,
          validation: {
            min: 2,
            max: 100,
          },
          helperText: "Your full name as it appears on your ID.",
        },
        {
          type: "text",
          name: "email",
          label: "Email Address",
          placeholder: "your.email@example.com",
          required: true,
          inputType: "email",
          validation: {
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Please enter a valid email address",
          },
          helperText: "We'll never share your email with anyone else.",
        },
        {
          type: "textarea",
          name: "bio",
          label: "Bio",
          placeholder: "Tell us about yourself...",
          required: true,
          validation: {
            min: 10,
            max: 500,
          },
          helperText: "Write a short bio to introduce yourself to others.",
        },
        {
          type: "dropdown-checkbox",
          name: "categories",
          label: "Categories",
          options: categories,
          placeholder: "Select categories",
          required: true,
          validation: {
            min: 1,
          },
          helperText: "Select the categories that interest you.",
        },
        {
          type: "dropdown-checkbox",
          name: "languages",
          label: "Languages",
          options: languages,
          placeholder: "Select languages",
          required: true,
          validation: {
            min: 1,
          },
          helperText: "Select the languages you speak.",
        },
      ]}
      onSubmit={handleSubmit}
      submitButtonText="Save Profile"
    />
  )
}

