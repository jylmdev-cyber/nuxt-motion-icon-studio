<script setup lang="ts">
const store = useStudioStore()
const open = ref(false)
</script>

<template>
  <header class="site-header">
    <NuxtLink class="brand" to="/">
      <span class="brand-mark"><i /><i /><i /></span>
      <span>{{ store.content?.settings.brand }}</span>
    </NuxtLink>

    <nav :class="{ open }">
      <a href="#systems">Sistemas</a>
      <a href="#motion">Animaciones</a>
      <a href="#icons">Iconos</a>
      <NuxtLink class="cms-link" to="/admin">CMS</NuxtLink>
    </nav>

    <button class="menu-button" type="button" aria-label="Abrir menú" @click="open = !open">
      <UIcon name="i-lucide-menu" />
    </button>
  </header>
</template>
