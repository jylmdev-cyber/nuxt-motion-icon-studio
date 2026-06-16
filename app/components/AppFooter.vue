<script setup lang="ts">
const store = useStudioStore()
</script>

<template>
  <footer class="footer">
    <div>
      <NuxtLink class="brand" to="/">
        <span class="brand-mark"><i /><i /><i /></span>
        <span>{{ store.content?.settings.brand }}</span>
      </NuxtLink>
      <p>{{ store.content?.settings.tagline }}</p>
    </div>
    <NuxtLink to="/admin">Administrar biblioteca</NuxtLink>
    <span>© {{ new Date().getFullYear() }}</span>
  </footer>
</template>
