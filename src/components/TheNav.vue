<script setup lang="ts">
import { ref } from 'vue'
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/solid'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'
import NavItems from './NavItems.vue'

const navItem = {
  [PAGE_TIMELINE]: ClockIcon,
  [PAGE_ACTIVITIES]: ListBulletIcon,
  [PAGE_PROGRESS]: ChartBarIcon,
}

const normalizePageHash = (): string => {
  const hash = window.location.hash.slice(1)
  if (Object.keys(navItem).includes(hash)) {
    return hash
  }
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}
const currentPage = ref<string>(normalizePageHash())
</script>

<template>
  <nav class="sticky bottom-0 bg-white z-10">
    <ul class="flex justify-around items-center border-t">
      <NavItems
        v-for="(icon, page) in navItem"
        :key="page"
        :href="`#${page}`"
        :class="{ 'bg-gray-300 pointer-events-none': currentPage === page }"
        @click="currentPage = page"
      >
        <component :is="icon" class="h-6 w-6" />
        {{ page }}
      </NavItems>
    </ul>
  </nav>
</template>
