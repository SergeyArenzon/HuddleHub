"use client"
import Form from "@/components/form";
import { useQuery } from "@tanstack/react-query";
import Api from "@/utils/api";

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




type GuideForm = {
    bio: string
    categories: string[]
    languages: string[]
    name: string
}


export default function SignupGuide() {
  // Queries
  const query = useQuery({ queryKey: ['languages'], queryFn: new Api().getLanguages() });


  const handleSubmit = (data: GuideForm) => {
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
          label: "Guide Name",
          placeholder: "Enter guide name",
          required: true,
          validation: {
            min: 2,
            max: 100,
          },
          helperText: "Your full name as it appears on your ID.",
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

