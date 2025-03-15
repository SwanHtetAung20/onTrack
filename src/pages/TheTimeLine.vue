<script setup lang="ts">
import { generateTimelineItems } from '@/functions'
import TimelineItem from '@/components/TimelineItem.vue'
import type { TimeLineItem } from '@/constants'
const timelineItems: TimeLineItem[] = generateTimelineItems()
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
      />
    </ul>
  </div>
</template>
