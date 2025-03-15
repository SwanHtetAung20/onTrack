<script setup lang="ts">
import type { TimeLineItem } from '@/constants'
import BaseSelect from './BaseSelect.vue'

const props = withDefaults(defineProps<{ timelineItem?: TimeLineItem }>(), {
  timelineItem: () => ({ hour: 0 }),
})

const hourLinkClasses = [
  'absolute -top-4 left-1/2 -translate-x-1/2 font-mono rounded px-2 text-xl',
  props.timelineItem.hour === new Date().getHours()
    ? 'bg-purple-900 font-black text-white'
    : 'bg-gray-100 text-gray-500',
]

const options = [
  { value: '1', label: 'Coding' },
  { value: '2', label: 'Reading' },
  { value: '3', label: 'Training' },
]

const selectedActivityId = '3'
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <a :class="hourLinkClasses">{{ props.timelineItem.hour }}.00</a>
    <BaseSelect :options="options" placeholder="Rest" :selected="selectedActivityId" />
  </li>
</template>
