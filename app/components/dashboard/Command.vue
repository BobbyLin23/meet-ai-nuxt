<script lang="ts" setup>
defineProps<{
  open: boolean
}>()
defineEmits<{
  (e: 'update:open', value: boolean): void
}>()
</script>

<template>
  <CommandResponsiveDialog :open="open" @update:open="$emit('update:open', $event)">
    <CommandInput placeholder="Find a meeting or agent" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem value="calendar">
          Calendar
        </CommandItem>
        <CommandItem value="search-emoji">
          Search Emoji
        </CommandItem>
        <CommandItem value="calculator">
          Calculator
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem value="profile">
          Profile
        </CommandItem>
        <CommandItem value="billing">
          Billing
        </CommandItem>
        <CommandItem value="settings">
          Settings
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandResponsiveDialog>
</template>
