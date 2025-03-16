<script setup lang="ts">
import ActivityItems from '@/components/ActivityItems.vue'
import { isActivityItemsValid } from '@/validator'

defineProps({
  activities: {
    type: Array as () => string[],
    default: () => [],
    validator: isActivityItemsValid,
  },
})
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItems v-for="activity in activities" :key="activity" :activity="activity" />
    </ul>
  </div>
</template>
