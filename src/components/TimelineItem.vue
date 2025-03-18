<script setup lang="ts">
import { type TimeLineItem, type Activity } from '@/constants'
import BaseSelect from './BaseSelect.vue'
import {
  isActivity,
  isActivityItemsValid,
  isTimelineItemValid,
  validateSelectOptions,
} from '@/validator'
import { toRaw } from 'vue'
import TimelineHour from './TimelineHour.vue'
import TimelineStopWatch from './TimelineStopWatch.vue'

const props = defineProps({
  timelineItem: {
    type: Object as () => TimeLineItem,
    default: () => ({ hour: 0 }),
    validator: isTimelineItemValid,
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
  selectActivity(value: Activity | null) {
    return isActivity(value) || value === null
  },
})

const selectActivity = (activityId: string | null | number): void => {
  const activity = props.activities.find((activity) => activity.id === activityId) || null
  const rawActivity = activity ? toRaw(activity) : null
  emit('selectActivity', rawActivity)
}
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :options="activitySelectOptions"
      placeholder="Rest"
      :selected="timelineItem.activityId"
      @select="selectActivity"
    />
    <TimelineStopWatch :seconds="timelineItem.activitySeconds" />
  </li>
</template>
