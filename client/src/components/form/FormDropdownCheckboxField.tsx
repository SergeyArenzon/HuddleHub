"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form"
import { FormFieldBase } from "./FormFieldBase"

export type DropdownCheckboxFieldProps = {
  name: string
  label: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
  helperText?: string
  register: UseFormRegister<any>
  errors: FieldErrors
  watch: UseFormWatch<any>
  setValue: UseFormSetValue<any>
  disabled?: boolean
  required?: boolean
  className?: string
}

export function FormDropdownCheckboxField({
  name,
  label,
  options,
  placeholder,
  helperText,
  register,
  errors,
  watch,
  setValue,
  disabled = false,
  required = false,
  className = "",
}: DropdownCheckboxFieldProps) {
  const [open, setOpen] = React.useState(false)
  const selectedItems = (watch(name) as string[]) || []

  const handleItemToggle = (value: string) => {
    const currentValues = [...selectedItems]
    setValue(
      name,
      currentValues.includes(value) ? currentValues.filter((item) => item !== value) : [...currentValues, value],
      { shouldValidate: true },
    )
  }

  // Register the field (needed for validation)
  React.useEffect(() => {
    register(name)
  }, [register, name])

  return (
    <FormFieldBase
      name={name}
      label={label}
      helperText={helperText}
      errors={errors}
      disabled={disabled}
      required={required}
      className={className}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={disabled}
          >
            {selectedItems.length > 0
              ? `${selectedItems.length} ${label.toLowerCase()} selected`
              : placeholder || `Select ${label.toLowerCase()}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleItemToggle(option.value)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedItems.includes(option.value)}
                      onCheckedChange={(checked) => handleItemToggle(option.value)}
                      id={`${name}-${option.value}`}
                      className="mr-2"
                    />
                    <Label htmlFor={`${name}-${option.value}`} onClick={(e) => e.stopPropagation()} className="flex-grow cursor-pointer">
                      {option.label}
                    </Label>
                    {selectedItems.includes(option.value) && <Check className="h-4 w-4 text-primary" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormFieldBase>
  )
}

