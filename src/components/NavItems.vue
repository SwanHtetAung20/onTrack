<script setup lang="ts">
import type { NavItem } from '@/constants'
import { currentPage, navigate } from '@/router'
import { isNavItemValid } from '@/validator'
import { computed } from 'vue'

const props = defineProps({
  navItem: {
    type: Object as () => NavItem,
    required: true,
    validator: isNavItemValid,
  },
})

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  { 'bg-gray-300 pointer-events-none': props.navItem.page === currentPage.value },
])
</script>

<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" :class="classes" @click="navigate(navItem.page)">
      <component :is="navItem.icon" class="h-6 w-6" />
      {{ navItem.page }}
    </a>
  </li>
</template>
