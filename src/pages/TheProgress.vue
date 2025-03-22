<script setup lang="ts">
import ProgressItems from '@/components/ProgressItems.vue'
import { trackedActivities } from '@/activity'
</script>

<template>
  <ul class="divide-y">
    <ProgressItems v-for="activity in trackedActivities" :key="activity.id" :activity="activity" />
  </ul>
</template>
