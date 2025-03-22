<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import { onActivated } from 'vue'
import {
  timelineItems,
  scrollToHour,
  timelineItemsRef,
  scrollToCurrentHour,
} from '@/timeline-items'

onActivated(scrollToCurrentHour)
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
