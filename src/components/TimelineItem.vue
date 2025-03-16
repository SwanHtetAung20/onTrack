<script setup lang="ts">
import { HOUR_IN_DAY, type TimeLineItem } from '@/constants'
import BaseSelect from './BaseSelect.vue'
import { isTimelineItemValid, validateSelectOptions } from '@/validator'
import { ref } from 'vue'
import TimelineHour from './TimelineHour.vue'

const props = defineProps({
  timelineItem: {
    type: Object as () => TimeLineItem,
    default: () => ({ hour: 0 }),
    validator: isTimelineItemValid,
  },
  activitySelectOptions: {
    type: Array as () => Array<{ value: number; label: string }>,
    default: () => [],
    validator: validateSelectOptions,
  },
})

const selectedActivityId = ref<number>(0)
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :options="activitySelectOptions"
      placeholder="Rest"
      :selected="selectedActivityId"
      @select="selectedActivityId = $event"
    />
  </li>
</template>
