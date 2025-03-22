<script setup lang="ts">
import type { Activity } from '@/constants'
import { isActivityItemValid } from '@/validator'
import { getActivityProgress } from '@/activity'
import { computed } from 'vue'
import { getProgressColor } from '@/functions'

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  activity: {
    type: Object as () => Activity,
    required: true,
    validator: isActivityItemValid,
  },
})

const progress = computed(() => getActivityProgress(props.activity))

const timeProgress = ['03:00 / 03:30', '03:15 / 03:45', '03:20 / 04:30', '03:30 / 04:15'][
  props.index
]
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="text-xl truncate">{{ activity.name }}</div>
    <div class="flex h-5 rounded bg-neutral-200 overflow-hidden">
      <div :class="getProgressColor(progress)" :style="`width: ${progress}%`"></div>
    </div>
    <div class="flex justify-between text-sm font-mono">
      <span> {{ progress }}% </span>
      <span>{{ timeProgress }}</span>
    </div>
  </li>
</template>
