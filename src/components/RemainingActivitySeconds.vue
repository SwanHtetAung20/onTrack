<script setup lang="ts">
import { formatSecondsWithSign } from '@/functions'
import type { Activity } from '@/constants'
import { isActivityItemValid } from '@/validator'
import { computed } from 'vue'
import { timelineItems, calculateTrackedActivitySeconds } from '@/timeline-items'

const props = defineProps({
  activity: {
    type: Object as () => Activity,
    required: true,
    validator: isActivityItemValid,
  },
})

const remainingSeconds = computed(
  () =>
    calculateTrackedActivitySeconds(timelineItems.value, props.activity) -
    props.activity.secondsToComplete,
)

const classes = computed(() => [
  'flex items-center font-xl  px-2 rounded font-mono',
  remainingSeconds.value < 0 ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100',
])
</script>

<template>
  <div :class="classes">
    {{ formatSecondsWithSign(remainingSeconds) }}
  </div>
</template>
