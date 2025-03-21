<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import { PAGE_TIMELINE } from '@/constants'
import { nextTick, watchPostEffect } from 'vue'
import { currentPage } from '@/router'
import {
  timelineItems,
  scrollToHour,
  timelineItemsRef,
  scrollToCurrentHour,
} from '@/timeline-items'

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick()
    scrollToCurrentHour()
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
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
        ref="timelineItemsRef"
      />
    </ul>
  </div>
</template>
