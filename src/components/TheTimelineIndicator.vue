<script setup lang="ts">
import { HUNDRED_PERCENTAGE, MINUTES_IN_HOUR, SECONDS_IN_DAY, SECONDS_IN_MINUTE } from '@/constants'
import { ref } from 'vue'

const indicatorRef = ref<HTMLElement | null>(null)

const calculateTopOffset = () => {
  return (calculateSecondsSinceMidnightInPercentage() * getTimelineHeight()) / HUNDRED_PERCENTAGE
}

const calculateSecondsSinceMidnightInPercentage = () => {
  return (HUNDRED_PERCENTAGE * calculateSecondsSinceMidnight()) / SECONDS_IN_DAY
}

const calculateSecondsSinceMidnight = () => {
  const now = new Date()
  return (
    SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() +
    SECONDS_IN_MINUTE * now.getMinutes() +
    now.getSeconds()
  )
}

const getTimelineHeight = () => {
  return (indicatorRef.value?.parentNode as HTMLElement)?.getBoundingClientRect().height ?? 0
}
</script>

<template>
  <hr
    ref="indicatorRef"
    class="absolute w-full pointer-events-none z-10 border-b-2 border-red-600"
    :style="{ top: `${calculateTopOffset()}px` }"
  />
</template>
