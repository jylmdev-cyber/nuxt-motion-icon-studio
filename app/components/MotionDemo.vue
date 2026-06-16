<script setup lang="ts">
defineProps<{
  title: string
  description: string
  animation: 'float' | 'reveal' | 'pulse' | 'wave'
}>()
</script>

<template>
  <article class="motion-demo-card">
    <div
      class="motion-demo"
      :class="`demo-${animation}`"
    >
      <span v-if="animation !== 'wave'" />
      <template v-else>
        <span
          v-for="item in 3"
          :key="item"
        />
      </template>
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </article>
</template>
