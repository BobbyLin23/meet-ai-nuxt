<script setup lang="ts">

</script>

<template>
  <SidebarProvider>
    <DashboardSidebar />
    <main class="w-screen h-screen flex flex-col bg-muted">
      <DashboardNavbar />
      <slot />
    </main>
  </SidebarProvider>
</template>
