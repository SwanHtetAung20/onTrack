<script setup lang="ts">
import { formatSecond } from '@/functions'
import type { Activity } from '@/constants'
import { isActivityItemValid } from '@/validator'
import { computed } from 'vue'
import { getTotalActivitySeconds } from '@/timeline-items'

const props = defineProps({
  activity: {
    type: Object as () => Activity,
    required: true,
    validator: isActivityItemValid,
  },
})

const secondsDiff = computed(
  () => getTotalActivitySeconds(props.activity) - props.activity.secondsToComplete,
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
