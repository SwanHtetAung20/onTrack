<script setup lang="ts">
import { PAGE_TIMELINE, type NavItem } from '@/constants'
import { currentPage, navigate } from '@/router'
import { isNavItemValid } from '@/validator'
import { computed } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { scrollToCurrentHour } from '@/timeline-items'

const props = defineProps({
  navItem: {
    type: Object as () => NavItem,
    required: true,
    validator: isNavItemValid,
  },
})

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  { 'bg-gray-300': props.navItem.page === currentPage.value },
])

const handleClick = () => {
  return currentPage.value === PAGE_TIMELINE && props.navItem.page === PAGE_TIMELINE
    ? scrollToCurrentHour()
    : navigate(props.navItem.page)
}
</script>

<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" :class="classes" @click="handleClick">
      <BaseIcon :name="navItem.icon" class="h-6 w-6" />
      {{ navItem.page }}
    </a>
  </li>
</template>
