<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-vue-next'
import { useSidebar } from '../ui/sidebar'

const { state, toggleSidebar, isMobile } = useSidebar()

const commandOpen = ref(false)

const keys = useMagicKeys()
const CmdK = keys['Cmd+K']

watch(() => CmdK, (v) => {
  if (v) {
    commandOpen.value = !commandOpen.value
  }
})
</script>

<template>
  <ClientOnly>
    <DashboardCommand :open="commandOpen" @update:open="commandOpen = $event" />
  </ClientOnly>
  <nav class="flex p-4 gap-x-2 items-center py-3 border-b bg-background">
    <Button class="size-9" variant="outline" @click="toggleSidebar">
      <PanelLeftIcon v-if="state === 'collapsed' || isMobile" />
      <PanelLeftCloseIcon v-else />
    </Button>
    <Button
      class="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
      variant="outline"
      size="sm"
      @click="() => commandOpen = true"
    >
      <SearchIcon />
      Search
      <kbd class="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-xs font-mono text-[10px] font-medium text-muted-foreground">
        <span class="text-xs">&#8984;</span>K
      </kbd>
    </Button>
  </nav>
</template>
