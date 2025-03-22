<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import { onActivated } from 'vue'
import { timelineItems, timelineItemsRef, scrollToCurrentHour } from '@/timeline-items'

onActivated(scrollToCurrentHour)
</script>

<template>
  <div class="mt-7">
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
