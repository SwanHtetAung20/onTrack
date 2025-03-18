<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import { type TimeLineItem, type Activity } from '@/constants'
import {
  validateSelectOptions,
  validateTimelineItems,
  isActivityItemsValid,
  isActivity,
  isTimelineItemValid,
} from '@/validator'
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
  activities: {
    type: Array as () => Activity[],
    required: true,
    validator: isActivityItemsValid,
  },
})

const emit = defineEmits({
  setTimelineItemActivity(timelineItem: TimeLineItem, activity: Activity | null) {
    return isTimelineItemValid(timelineItem) && (activity === null || isActivity(activity))
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
        :activities="activities"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
      />
    </ul>
  </div>
</template>
