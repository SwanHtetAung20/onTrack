<script setup lang="ts">
import type { Activity } from '@/constants'
import { isActivityItemValid } from '@/validator'
import { calculateActivityCompletionPercentage } from '@/activity'
import { computed } from 'vue'
import { formatSecond, getProgressColor } from '@/functions'
import { timelineItems, calculateTrackedActivitySeconds } from '@/timeline-items'

const props = defineProps({
  activity: {
    type: Object as () => Activity,
    required: true,
    validator: isActivityItemValid,
  },
})

const trackedActivitySeconds = computed(() =>
  calculateTrackedActivitySeconds(timelineItems.value, props.activity),
)

const percentage = computed(() =>
  calculateActivityCompletionPercentage(props.activity, trackedActivitySeconds.value),
)
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="text-xl truncate">{{ activity.name }}</div>
    <div class="flex h-10 rounded bg-neutral-200 overflow-hidden">
      <div :class="getProgressColor(percentage)" :style="`width: ${percentage}%`"></div>
    </div>
    <div class="flex justify-between text-sm font-mono">
      <span> {{ percentage }}% </span>
      <span>
        {{ formatSecond(trackedActivitySeconds) }} /
        {{ formatSecond(activity.secondsToComplete) }}
      </span>
    </div>
  </li>
</template>
