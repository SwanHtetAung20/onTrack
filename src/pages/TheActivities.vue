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

const emit = defineEmits({
  deleteActivity(activity: string) {
    return typeof activity === 'string'
  },
})
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItems
        v-for="activity in activities"
        :key="activity"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
      />
    </ul>
  </div>
</template>
