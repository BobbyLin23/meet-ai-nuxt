<script lang="ts" setup>
import { BotIcon, StarIcon, VideoIcon } from 'lucide-vue-next'

const route = useRoute()

const firstSection = [
  {
    icon: VideoIcon,
    label: 'Meetings',
    href: '/meetings',
  },
  {
    icon: BotIcon,
    label: 'Agents',
    href: '/agents',
  },
]

const secondSection = [
  {
    icon: StarIcon,
    label: 'Upgrade',
    href: '/upgrade',
  },
]
</script>

<template>
  <Sidebar>
    <SidebarHeader class="text-sidebar-accent-foreground">
      <NuxtLink href="/" class="flex items-center gap-2 px-2 pt-2">
        <NuxtImg src="/logo.svg" :height="36" :width="36" alt="logo" />
        <p class="text-2xl font-semibold">
          Meet.AI
        </p>
      </NuxtLink>
    </SidebarHeader>
    <div class="px-4 py-2">
      <Separator class="opacity-10 text-[#5D6B68]" />
    </div>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="item in firstSection"
              :key="item.label"
            >
              <SidebarMenuButton
                as-child
                :class="cn('h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                           route.path === item.href && 'bg-linear-to-r/oklch border border-[#5D6B68]/10',
                )"
                :is-active="route.path === item.href"
              >
                <NuxtLink :href="item.href">
                  <component :is="item.icon" class="size-5" />
                  <span class="text-sm font-medium tracking-tight">
                    {{ item.label }}
                  </span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <div class="px-4 py-2">
        <Separator class="opacity-10 text-[#5D6B68]" />
      </div>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="item in secondSection"
              :key="item.label"
            >
              <SidebarMenuButton
                as-child
                :class="cn('h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                           route.path === item.href && 'bg-linear-to-r/oklch border border-[#5D6B68]/10',
                )"
                :is-active="route.path === item.href"
              >
                <NuxtLink :href="item.href">
                  <component :is="item.icon" class="size-5" />
                  <span class="text-sm font-medium tracking-tight">
                    {{ item.label }}
                  </span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter class="text-white">
      <DashboardUserButton />
    </SidebarFooter>
  </Sidebar>
</template>
