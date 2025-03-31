"use client"
import Form from "@/components/form";
import { useQuery } from "@tanstack/react-query";
import Api from "@/utils/api";
import Loading from "@/components/Loading";
import { Error } from "@/components/Error";
import { useCallback, useEffect, useState } from "react";
import { GeoLocationService } from "@/lib/geo-location";

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

type GuideFormValues = {
    bio: string
    categories: string[]
    languages: string[]
    name: string
    country: string
    city: string
}

export default function SignupGuide() {
  console.log("SignupGuide rerender");
  const [formState, setFormState] = useState<GuideFormValues>();
  const api = new Api();
  const geoLocationService = new GeoLocationService();
  
  const handleFormChange = (currentState: Partial<GuideFormValues>) => {
    console.log("[][][][][");
    console.log({currentState});
    
    setFormState(currentState as GuideFormValues);
    
  };
  
  // Queries
  const { data: languages, isLoading, error, refetch } = useQuery({
    retry: false,  
    queryKey: ['languages'], 
    queryFn:() => api.getLanguages() });

    

  const handleSubmit = (data: GuideFormValues) => {
    console.log("Form submitted:", data)
    // Handle form submission here
  }
  
  if (isLoading) return <Loading/>
  if (error) return <Error retryAction={() => refetch()}/>

  console.log( geoLocationService.getAllCities("IL"));
  console.log({country: formState?.country});
  
  
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
          options: languages?.map((lang) => ({ value: lang.code, label: lang.name })) || [],
          placeholder: "Select languages",
          required: true,
          validation: {
            min: 1,
          },
          helperText: "Select the languages you speak.",
        },
        {
          type: "select-dropdown",
          name: "country",
          label: "Country",
          options: geoLocationService.getAllCountries()?.map(country => ({ value: country.code, label: country.name })),
          placeholder: "Select country",
          required: true,
          helperText: "Select the country you live in.",
        },
        {
          type: "select-dropdown",
          name: "city",
          label: "City",
          options: geoLocationService.getAllCities(formState?.country || [])?.map(city => ({ value: city.code, label: city.name })) || [],
          placeholder: "Select city",
          required: true,
          disabled: !Boolean(formState?.country),
          helperText: "Select the city you live in.",
        },
      ]}
      onSubmit={handleSubmit}
      onChange={handleFormChange} 
      submitButtonText="Save Profile"
    />
  )
}

