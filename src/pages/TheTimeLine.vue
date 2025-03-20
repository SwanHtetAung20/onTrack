<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import { type TimeLineItem, type Activity, MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants'
import { validateTimelineItems, isActivity, isTimelineItemValid } from '@/validator'
import { ref, nextTick, type ComponentPublicInstance, watchPostEffect } from 'vue'
const props = defineProps({
  timelineItems: {
    type: Array as () => TimeLineItem[],
    default: () => [],
    validator: validateTimelineItems,
  },
  currentPage: {
    type: String,
    required: true,
    validator(value: string) {
      return typeof value === 'string'
    },
  },
})

const emit = defineEmits({
  setTimelineItemActivity(timelineItem: TimeLineItem, activity: Activity | null) {
    return isTimelineItemValid(timelineItem) && (activity === null || isActivity(activity))
  },
})

const timelineItemsRef = ref<ComponentPublicInstance[]>([])

const scrollToHour = (hour: number) => {
  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  } else {
    timelineItemsRef.value[hour - 1].$el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

defineExpose({ scrollToHour })

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()

    scrollToHour(new Date().getHours())
  }
})
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
        ref="timelineItemsRef"
        @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>
