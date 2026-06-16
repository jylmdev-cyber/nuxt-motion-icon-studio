<script setup lang="ts">
const store = useStudioStore()
await callOnce('studio-content', () => store.initialize())
</script>

<template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
