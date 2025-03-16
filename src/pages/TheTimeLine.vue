<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import { HOUR_IN_DAY, type TimeLineItem } from '@/constants'
import { isTimelineItemValid } from '@/validator'
defineProps({
  timelineItems: {
    type: Array as () => TimeLineItem[],
    default: () => [],
    validator: (timelineItems: TimeLineItem[]) => timelineItems.every(isTimelineItemValid),
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
      />
    </ul>
  </div>
</template>
