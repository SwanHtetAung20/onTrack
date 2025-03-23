<script setup lang="ts">
import ProgressItems from '@/components/ProgressItems.vue'
import { trackedActivities } from '@/activity'
import TheProgressEmptyStage from '@/components/TheProgressEmptyStage.vue'
</script>

<template>
  <ul v-if="trackedActivities.length" class="divide-y">
    <ProgressItems v-for="activity in trackedActivities" :key="activity.id" :activity="activity" />
  </ul>
  <TheProgressEmptyStage v-else />
</template>
