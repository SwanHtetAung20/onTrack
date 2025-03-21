<script setup lang="ts">
import { type TimeLineItem } from '@/constants'
import BaseSelect from './BaseSelect.vue'
import { isTimelineItemValid } from '@/validator'
import { inject } from 'vue'
import TimelineHour from './TimelineHour.vue'
import TimelineStopWatch from './TimelineStopWatch.vue'
import { activitySelectOptionsKey, setTimelineItemActivityKey } from '@/key'

defineProps({
  timelineItem: {
    type: Object as () => TimeLineItem,
    default: () => ({ hour: 0 }),
    validator: isTimelineItemValid,
  },
})

const activitySelectOptions = inject<Array<{ value: number | string; label: string }>>(
  activitySelectOptionsKey,
  [],
)

const setTimelineItemActivity = inject<
  (timelineItem: TimeLineItem, activityId: string | null) => void
>(setTimelineItemActivityKey, () => {})

const emit = defineEmits({
  scrollToHour: null,
})

const selectActivity = (timelineItem: TimeLineItem, activityId: string | number | null): void => {
  setTimelineItemActivity(timelineItem, activityId ? activityId.toString() : null)
}
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour')" />
    <BaseSelect
      :options="activitySelectOptions"
      placeholder="Rest"
      :selected="timelineItem.activityId"
      @select="selectActivity(timelineItem, $event)"
    />
    <TimelineStopWatch :timeline-item="timelineItem" />
  </li>
</template>
