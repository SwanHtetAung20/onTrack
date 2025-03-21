<script setup lang="ts">
import { formatSecond, getTotalActivitySeconds } from '@/functions'
import type { Activity, TimeLineItem } from '@/constants'
import { isActivityItemValid } from '@/validator'
import { computed, inject } from 'vue'
import { timelineItemsKey } from '@/key'

const props = defineProps({
  activity: {
    type: Object as () => Activity,
    required: true,
    validator: isActivityItemValid,
  },
})

const timelineItems = inject<TimeLineItem[]>(timelineItemsKey, [])

const secondsDiff = computed(
  () => getTotalActivitySeconds(props.activity, timelineItems) - props.activity.secondsToComplete,
)

const sign = computed(() => (secondsDiff.value >= 0 ? '+' : '-'))

const seconds = computed(() => `${sign.value}${formatSecond(secondsDiff.value)}`)

const colorClasses = computed(() =>
  secondsDiff.value < 0 ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100',
)

const classes = computed(
  () => `flex items-center font-xl  px-2 rounded font-mono ${colorClasses.value}`,
)
</script>

<template>
  <div :class="classes">
    {{ seconds }}
  </div>
</template>
