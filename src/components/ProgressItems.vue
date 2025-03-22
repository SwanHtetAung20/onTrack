<script setup lang="ts">
import type { Activity } from '@/constants'
import { isActivityItemValid } from '@/validator'
import { getActivityProgress } from '@/activity'
import { computed } from 'vue'
import { formatSecond, getProgressColor } from '@/functions'
import { getTotalActivitySeconds } from '@/timeline-items'

const props = defineProps({
  activity: {
    type: Object as () => Activity,
    required: true,
    validator: isActivityItemValid,
  },
})

const progress = computed(() => getActivityProgress(props.activity))
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="text-xl truncate">{{ activity.name }}</div>
    <div class="flex h-5 rounded bg-neutral-200 overflow-hidden">
      <div :class="getProgressColor(progress)" :style="`width: ${progress}%`"></div>
    </div>
    <div class="flex justify-between text-sm font-mono">
      <span> {{ progress }}% </span>
      <span>
        {{ formatSecond(getTotalActivitySeconds(activity)) }} /
        {{ formatSecond(activity.secondsToComplete) }}
      </span>
    </div>
  </li>
</template>
