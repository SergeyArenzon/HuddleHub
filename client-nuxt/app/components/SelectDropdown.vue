<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

// Define props with types
const props = defineProps<{
  options: Array<{ value: string; label: string }>
  placeholder?: string
  modelValue?: string
  disabled?: boolean
}>()

// Define emits for value changes
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// Setup component state
const open = ref(false)
const selected = computed(() => props.modelValue)

// Handle item selection
const handleSelect = (currentValue: string) => {
  emit('update:modelValue', currentValue)
  open.value = false
}

// Compute the selected label
const selectedLabel = computed(() => {
  if (!selected.value) return props.placeholder || 'Select...'
  const option = props.options.find(opt => opt.value === selected.value)
  return option ? option.label : props.placeholder || 'Select...'
})
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        :disabled="disabled"
        class="w-full justify-between"
      >
        {{ selectedLabel }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0">
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="() => handleSelect(option.value)"
            >
              <Check
                :class="cn(
                  'mr-2 h-4 w-4',
                  selected === option.value ? 'opacity-100' : 'opacity-0'
                )"
              />
              {{ option.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template> 