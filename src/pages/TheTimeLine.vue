<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import type { TimeLineItem } from '@/constants'
defineProps<{ timelineItems: TimeLineItem[] }>()
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
