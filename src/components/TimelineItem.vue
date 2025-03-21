<script setup lang="ts">
import { type TimeLineItem } from '@/constants'
import BaseSelect from './BaseSelect.vue'
import { isTimelineItemValid } from '@/validator'
import TimelineHour from './TimelineHour.vue'
import TimelineStopWatch from './TimelineStopWatch.vue'
import { updateTimelineItem } from '@/timeline-items'
import { activitySelectOptions } from '@/activity'

defineProps({
  timelineItem: {
    type: Object as () => TimeLineItem,
    default: () => ({ hour: 0 }),
    validator: isTimelineItemValid,
  },
})

const emit = defineEmits({
  scrollToHour: null,
})
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour')" />
    <BaseSelect
      :options="activitySelectOptions"
      placeholder="Rest"
      :selected="timelineItem.activityId"
      @select="updateTimelineItem(timelineItem, { activityId: $event?.toString() || null })"
    />
    <TimelineStopWatch :timeline-item="timelineItem" />
  </li>
</template>
