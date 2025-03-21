<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import { type TimeLineItem, MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants'
import { validateTimelineItems } from '@/validator'
import { ref, nextTick, type ComponentPublicInstance, watchPostEffect } from 'vue'
import { currentPage } from '@/router'
defineProps({
  timelineItems: {
    type: Array as () => TimeLineItem[],
    default: () => [],
    validator: validateTimelineItems,
  },
})

const timelineItemsRef = ref<ComponentPublicInstance[]>([])

const scrollToHour = (hour: number) => {
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemsRef.value[hour - 1].$el
  el.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

defineExpose({ scrollToHour })

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
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
        ref="timelineItemsRef"
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>
