<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import { HOUR_IN_DAY, type TimeLineItem } from '@/constants'
import { isTimelineItemValid, validateSelectOptions, validateTimelineItems } from '@/validator'
defineProps({
  timelineItems: {
    type: Array as () => TimeLineItem[],
    default: () => [],
    validator: validateTimelineItems,
  },
  activitySelectOptions: {
    type: Array as () => Array<{ value: number | string; label: string }>,
    default: () => [],
    validator: validateSelectOptions,
  },
})
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
      />
    </ul>
  </div>
</template>
