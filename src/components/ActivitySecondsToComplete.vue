<script setup lang="ts">
import { formatSecond } from '@/functions'
import type { Activity } from '@/constants'
import { isActivityItemValid } from '@/validator'

defineProps({
  activity: {
    type: Object as () => Activity,
    required: true,
    validator: isActivityItemValid,
  },
})
</script>

<template>
  <div class="flex items-center font-xl bg-purple-100 text-purple-600 px-2 rounded font-mono">
    {{ formatSecond(activity.secondsToComplete) }}
  </div>
</template>
