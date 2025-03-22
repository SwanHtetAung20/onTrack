<script setup lang="ts">
import ProgressItems from '@/components/ProgressItems.vue'
import { trackedActivities } from '@/activity'
</script>

<template>
  <ul class="divide-y">
    <ProgressItems
      v-for="(activity, index) in trackedActivities"
      :key="activity.id"
      :index="index"
      :activity="activity"
    />
  </ul>
</template>
