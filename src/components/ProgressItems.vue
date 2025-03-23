<script setup lang="ts">
import { HUNDRED_PERCENTAGE, type Activity } from '@/constants'
import { isActivityItemValid } from '@/validator'
import { formatSecond } from '@/functions'
import { useProgress } from '@/composables/progress'

const props = defineProps({
  activity: {
    type: Object as () => Activity,
    required: true,
    validator: isActivityItemValid,
  },
})

const { colorClass, percentage, trackedActivitySeconds } = useProgress(props.activity)
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="text-xl truncate">{{ activity.name }}</div>
    <div class="flex h-10 rounded bg-neutral-200 overflow-hidden">
      <div
        :class="['transition-all', colorClass]"
        :style="{ width: `${Math.min(percentage, HUNDRED_PERCENTAGE)}%` }"
      ></div>
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
