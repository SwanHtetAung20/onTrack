<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import { onActivated, onDeactivated } from 'vue'
import { timelineItems, timelineItemsRef, scrollToCurrentHour } from '@/timeline-items'
import TheTimelineIndicator from '@/components/TheTimelineIndicator.vue'
import { startCurrentDateTimer, stopCurrentDateTimer } from '@/time'
import { stopTimelineItemTimer } from '@/timeline-items'

stopTimelineItemTimer()

onActivated(() => {
  scrollToCurrentHour()
  startCurrentDateTimer()
})

onDeactivated(stopCurrentDateTimer)
</script>

<template>
  <div class="relative mt-7">
    <TheTimelineIndicator />
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemsRef"
      />
    </ul>
  </div>
</template>
