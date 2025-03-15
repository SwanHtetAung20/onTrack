<script setup lang="ts">
import TheLogo from './TheLogo.vue'
import TheHeaderProgress from './TheHeaderProgress.vue'

const emit = defineEmits(['goToTimeline', 'goToProgress'])
</script>

<template>
  <header class="sticky top-0 z-20 flex justify-between items-center p-4 bg-white shadow-md">
    <TheLogo @click="emit('goToTimeline')" />
    <TheHeaderProgress @click="emit('goToProgress')" />
  </header>
</template>
