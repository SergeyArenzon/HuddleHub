"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm, SubmitHandler } from "react-hook-form"


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

export default function GuideForm() {
  const [bio, setBio] = React.useState("")
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>([])
  const [openCategories, setOpenCategories] = React.useState(false)
  const [openLanguages, setOpenLanguages] = React.useState(false)


  const {
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const handleCategoryToggle = (value: string) => {
    setSelectedCategories((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleLanguageToggle = (value: string) => {
    setSelectedLanguages((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      bio,
      selectedCategories,
      selectedLanguages,
    })
    // Handle form submission here
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6 p-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Profile Information</h2>
        <p className="text-muted-foreground">Complete your profile information below</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself..."
          className="min-h-[150px]"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">Write a short bio to introduce yourself to others.</p>
      </div>

      <div className="space-y-2">
        <Label>Categories</Label>
        <Popover open={openCategories} onOpenChange={setOpenCategories}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={openCategories} className="w-full justify-between">
              {selectedCategories.length > 0 ? `${selectedCategories.length} categories selected` : "Select categories"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search categories..." />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {categories.map((category) => (
                    <CommandItem
                      key={category.value}
                      onSelect={() => handleCategoryToggle(category.value)}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category.value)}
                        onCheckedChange={() => handleCategoryToggle(category.value)}
                        id={`category-${category.value}`}
                        className="mr-2"
                      />
                      <Label htmlFor={`category-${category.value}`} className="flex-grow cursor-pointer">
                        {category.label}
                      </Label>
                      {selectedCategories.includes(category.value) && <Check className="h-4 w-4 text-primary" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <p className="text-sm text-muted-foreground">Select the categories that interest you.</p>
      </div>

      <div className="space-y-2">
        <Label>Languages</Label>
        <Popover open={openLanguages} onOpenChange={setOpenLanguages}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={openLanguages} className="w-full justify-between">
              {selectedLanguages.length > 0 ? `${selectedLanguages.length} languages selected` : "Select languages"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search languages..." />
              <CommandList>
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {languages.map((language) => (
                    <CommandItem
                      key={language.value}
                      onSelect={() => handleLanguageToggle(language.value)}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        checked={selectedLanguages.includes(language.value)}
                        onCheckedChange={() => handleLanguageToggle(language.value)}
                        id={`language-${language.value}`}
                        className="mr-2"
                      />
                      <Label htmlFor={`language-${language.value}`} className="flex-grow cursor-pointer">
                        {language.label}
                      </Label>
                      {selectedLanguages.includes(language.value) && <Check className="h-4 w-4 text-primary" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <p className="text-sm text-muted-foreground">Select the languages you speak.</p>
      </div>

      <Button type="submit" className="w-full">
        Save Profile
      </Button>
    </form>
  )
}

