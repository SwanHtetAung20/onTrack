<script setup lang="ts">
import TheLogo from './TheLogo.vue'
import TheHeaderProgress from './TheHeaderProgress.vue'
import { isPageValid } from '@/validator'
import { PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'

const emit = defineEmits({
  navigate: isPageValid,
})
</script>

<template>
  <header class="sticky top-0 z-20 flex justify-between items-center p-4 bg-white shadow-md">
    <TheLogo @click="emit('navigate', PAGE_TIMELINE)" />
    <TheHeaderProgress @click="emit('navigate', PAGE_PROGRESS)" />
  </header>
</template>
