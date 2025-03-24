<script setup lang="ts">
import { computed } from 'vue'
import { scrollToHour } from '@/timeline-items'
import { now } from '@/time'

const props = defineProps({
  hour: {
    type: Number,
    required: true,
  },
})

const classes = computed(() => [
  'absolute -top-4 left-1/2 -translate-x-1/2 font-mono rounded px-2 text-xl cursor-pointer',
  props.hour === now.value.getHours()
    ? 'bg-purple-900 font-black text-white'
    : 'bg-gray-100 text-gray-500',
])

const formattedHour = `${props.hour.toString().padStart(2, '0')}.00`
</script>

<template>
  <a :class="classes" @click.prevent="scrollToHour(hour)"> {{ formattedHour }}</a>
</template>
