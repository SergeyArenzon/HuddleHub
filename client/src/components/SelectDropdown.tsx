"use client"

import { useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"

// Generic type for items
type Item = {
  value: string
  label: string
}

type SelectDropdownProps = {
    options: Item[]
    label?: string
    placeholder?: string
    onSelectionChange?: (value: string | null) => void
    defaultValue?: string | null
    className?: string
    name: string
    helperText?: string
    register: UseFormRegister<any>
    watch: UseFormWatch<any>
    setValue: UseFormSetValue<any>
    disabled?: boolean
    required?: boolean
}

export default function SelectDropdown({
    options,
    name,
    defaultValue = null,
    register,
    setValue,
    placeholder = "Select...",
    disabled = false,
}: SelectDropdownProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<SelectDropdownProps["defaultValue"]>(defaultValue)
  
  const handleSelect = (currentValue: string) => {
    setValue(name, currentValue, { shouldValidate: true })
    setSelected(currentValue)
    setOpen(false)
  }

    useEffect(() => {
      register(name)
    }, [register, name])
    
  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
        <Button
            id="select-dropdown"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-full justify-between">
            {selected ? options.find((item) => item.value === selected)?.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
        <Command>
            <CommandInput placeholder={`Search...`} />
            <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
                {options.map((option) => (
                <CommandItem 
                    id={option.value} 
                    key={option.value} 
                    value={`${option.value}`} 
                    onSelect={handleSelect}>
                    <Check className={cn("mr-2 h-4 w-4 text-primary", selected === option.value ? "opacity-100" : "opacity-0")} />
                    <Label htmlFor={`${option.value}`} className="flex-grow cursor-pointer">{option.label}</Label>
                </CommandItem>
                ))}
            </CommandGroup>
            </CommandList>
        </Command>
        </PopoverContent>
    </Popover>)
}

