<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import { type TimeLineItem, type Activity, MIDNIGHT_HOUR } from '@/constants'
import {
  validateSelectOptions,
  validateTimelineItems,
  isActivityItemsValid,
  isActivity,
  isTimelineItemValid,
} from '@/validator'
import { ref, onMounted, ComponentPublicInstance } from 'vue'
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

const timelineItemsRef = ref<ComponentPublicInstance[]>([])

const scrollToCurrentTimelineItems = () => {
  const currentHour = new Date().getHours()
  if (currentHour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  } else {
    timelineItemsRef.value[currentHour - 1].$el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

onMounted(scrollToCurrentTimelineItems)
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
        ref="timelineItemsRef"
      />
    </ul>
  </div>
</template>
