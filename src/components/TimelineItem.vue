<script setup lang="ts">
import { type TimeLineItem, type Activity } from '@/constants'
import BaseSelect from './BaseSelect.vue'
import { isActivity, isTimelineItemValid } from '@/validator'
import { inject, toRaw } from 'vue'
import TimelineHour from './TimelineHour.vue'
import TimelineStopWatch from './TimelineStopWatch.vue'

defineProps({
  timelineItem: {
    type: Object as () => TimeLineItem,
    default: () => ({ hour: 0 }),
    validator: isTimelineItemValid,
  },
})

const activitySelectOptions = inject<Array<{ value: number | string; label: string }>>(
  'activitySelectOptions',
  [],
)

const emit = defineEmits({
  selectActivity(value: Activity | null) {
    return isActivity(value) || value === null
  },
  scrollToHour(hour: number) {
    return typeof hour === 'number'
  },
})

const activities = inject<Activity[]>('activities', [])

const selectActivity = (activityId: string | null | number): void => {
  const activity = activities.find((activity) => activity.id === activityId) || null
  const rawActivity = activity ? toRaw(activity) : null
  emit('selectActivity', rawActivity)
}
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />
    <BaseSelect
      :options="activitySelectOptions"
      placeholder="Rest"
      :selected="timelineItem.activityId"
      @select="selectActivity"
    />
    <TimelineStopWatch :timeline-item="timelineItem" />
  </li>
</template>
