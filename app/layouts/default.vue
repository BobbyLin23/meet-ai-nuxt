<script setup lang="ts">

</script>

<template>
  <SidebarProvider>
    <DashboardSidebar />
    <main class="w-screen h-screen flex flex-col bg-muted">
      <slot />
    </main>
  </SidebarProvider>
</template>
