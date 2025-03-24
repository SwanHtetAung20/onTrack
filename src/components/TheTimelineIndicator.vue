<script setup lang="ts">
import { HUNDRED_PERCENTAGE } from '@/constants'
import { ref, computed, onActivated, onDeactivated } from 'vue'
import { secondsSinceMidnightInPercentage, startTimer, stopTimer } from '@/time'

const indicatorRef = ref<HTMLElement | null>(null)

//const { secondsSinceMidnightInPercentage } = useSecondsSinceMidnight()

const topOffset = computed(
  () => (secondsSinceMidnightInPercentage.value * getTimelineHeight()) / HUNDRED_PERCENTAGE,
)

const getTimelineHeight = () => {
  return (indicatorRef.value?.parentNode as HTMLElement)?.getBoundingClientRect().height ?? 0
}

onActivated(startTimer)
onDeactivated(stopTimer)
</script>

<template>
  <hr
    ref="indicatorRef"
    class="absolute w-full pointer-events-none z-10 border-b-2 border-red-600"
    :style="{ top: `${topOffset}px` }"
  />
</template>
