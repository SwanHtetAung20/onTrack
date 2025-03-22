<script setup lang="ts">
import type { Activity } from '@/constants'
import { isActivityItemValid } from '@/validator'

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
const color = ['red', 'yellow', 'blue', 'green'][props.index]
const progress = [10, 50, 70, 100][props.index]
const timeProgress = ['03:00 / 03:30', '03:15 / 03:45', '03:20 / 04:30', '03:30 / 04:15'][
  props.index
]
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="text-xl truncate">{{ activity.name }}</div>
    <div class="flex h-5 rounded bg-neutral-200 overflow-hidden">
      <div :class="`bg-${color}-500`" :style="`width: ${progress}%`"></div>
    </div>
    <div class="flex justify-between text-sm font-mono">
      <span> {{ progress }}% </span>
      <span>{{ timeProgress }}</span>
    </div>
  </li>
</template>
