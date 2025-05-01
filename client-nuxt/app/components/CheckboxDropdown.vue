<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'

// Define props with types
const props = defineProps<{
  options: Array<{ value: string; label: string }>
  label: string
  placeholder?: string
  modelValue?: string[]
  disabled?: boolean
}>()

// Define emits for value changes
const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

// Setup component state
const open = ref(false)
const searchQuery = ref('')
const commandInputRef = ref<HTMLInputElement | null>(null)

// Add debug logging for open state changes
watch(open, (newValue) => {
  console.log('🔍 CheckboxDropdown - open state changed:', newValue)
})

// Watch for changes to the modelValue prop
watch(() => props.modelValue, (newValue, oldValue) => {
  console.log('🔍 FormCheckboxDropdown - modelValue prop changed:',
    { newValue, oldValue, isArray: Array.isArray(newValue) })
}, { immediate: true, deep: true })

// Filtered options based on search query
const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  
  const query = searchQuery.value.toLowerCase().trim()
  return props.options.filter(option => 
    option.label.toLowerCase().includes(query)
  )
})

// Handle item toggle
const handleItemToggle = (value: string) => {
  console.log('🔍 FormCheckboxDropdown - handleItemToggle called with:', value)
  const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  console.log('🔍 FormCheckboxDropdown - Current modelValue:', currentValues)
  
  let newValues: string[]
  if (currentValues.includes(value)) {
    newValues = currentValues.filter(item => item !== value)
  } else {
    newValues = [...currentValues, value]
  }
  
  console.log('🔍 FormCheckboxDropdown - Emitting new values:', newValues)
  emit('update:modelValue', newValues)
}

// Handle search input
const handleSearch = (event: Event) => {
  searchQuery.value = (event.target as HTMLInputElement).value
}

// Compute the display text
const displayText = computed(() => {
  const selectedValues = Array.isArray(props.modelValue) ? props.modelValue : []
  
  if (selectedValues.length === 0) {
    return props.placeholder || `Select ${props.label.toLowerCase()}`
  }
  return `${selectedValues.length} ${props.label.toLowerCase()} selected`
})

// When popover opens, focus the input
watch(open, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      // Find and focus the command input
      const inputElement = document.querySelector('[data-slot="command-input"]') as HTMLInputElement
      if (inputElement) {
        inputElement.focus()
      }
    })
  } else {
    // Clear search when closing
    searchQuery.value = ''
  }
})
</script>

<template>
  <div>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          :disabled="disabled"
          class="w-full justify-between"
          @click="console.log('🔍 CheckboxDropdown - Button clicked')"
        >
          {{ displayText }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-full p-0">
        <Command>
          <div class="flex items-center border-b px-3">
            <input
              data-slot="command-input"
              type="text"
              placeholder="Search..."
              :value="searchQuery"
              @input="handleSearch"
              class="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList>
            <CommandEmpty>No {{ label.toLowerCase() }} found.</CommandEmpty>
            <CommandGroup class="max-h-64 overflow-auto">
              <div 
                v-for="option in filteredOptions" 
                :key="option.value"
                :for="`checkbox-${option.value}`"
                class="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm w-full"
                @click="handleItemToggle(option.value)"
              >
                <Checkbox
                  :model-value="Array.isArray(modelValue) && modelValue.includes(option.value)"
                  class="mr-2"
                />
                <!-- <div v-show="Array.isArray(modelValue) && modelValue.includes(option.value)">v</div> -->
                <span class="flex-grow">
                  {{ option.label }}
                </span>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template> 