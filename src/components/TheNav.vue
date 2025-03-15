<script setup lang="ts">
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/solid'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'
import NavItems from './NavItems.vue'

const navItem = {
  [PAGE_TIMELINE]: ClockIcon,
  [PAGE_ACTIVITIES]: ListBulletIcon,
  [PAGE_PROGRESS]: ChartBarIcon,
}

defineProps({
  currentPage: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['navigate'])
</script>

<template>
  <nav class="sticky bottom-0 bg-white z-10">
    <ul class="flex justify-around items-center border-t">
      <NavItems
        v-for="(icon, page) in navItem"
        :key="page"
        :href="`#${page}`"
        :class="{ 'bg-gray-300 pointer-events-none': page === currentPage }"
        @click="emit('navigate', page)"
      >
        <component :is="icon" class="h-6 w-6" />
        {{ page }}
      </NavItems>
    </ul>
  </nav>
</template>
