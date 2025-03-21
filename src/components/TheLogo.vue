<script setup lang="ts">
import { PAGE_TIMELINE } from '@/constants'
import { navigate, currentPage } from '@/router'
import { scrollToCurrentHour } from '@/timeline-items'

const handleClick = () => {
  return currentPage.value === PAGE_TIMELINE ? scrollToCurrentHour() : navigate(PAGE_TIMELINE)
}
</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="handleClick">
    <img
      src="https://img-c.udemycdn.com/course/750x422/5157066_66bb.jpg"
      alt="Logo"
      class="rounded w-20 h-20 brightness-125"
    />
  </a>
</template>
