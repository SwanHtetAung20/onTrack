<script setup lang="ts">
import ActivityItems from '@/components/ActivityItems.vue'
import { isActivityItemsValid, isActivityItemValid } from '@/validator'
import TheActivityForm from '@/components/TheActivityForm.vue'
import TheActivitiesEmptyStage from '@/components/TheActivitiesEmptyStage.vue'
import type { Activity } from '@/constants'

defineProps({
  activities: {
    type: Array as () => Activity[],
    default: () => [],
    validator: isActivityItemsValid,
  },
})

const emit = defineEmits({
  deleteActivity: isActivityItemValid,
  createActivity(name: string) {
    return typeof name === 'string'
  },
  setSecondsToComplete(activity: Activity, secondsToComplete: number | null | string) {
    return (
      isActivityItemValid(activity) &&
      (typeof secondsToComplete === 'number' ||
        secondsToComplete === null ||
        typeof secondsToComplete === 'string')
    )
  },
})

const createActivity = (name: string) => {
  emit('createActivity', name)
}
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length" class="divide-y grow">
      <ActivityItems
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
        @set-seconds-to-complete="emit('setSecondsToComplete', activity, $event)"
      />
    </ul>
    <TheActivitiesEmptyStage v-else />
    <TheActivityForm @submit="createActivity" />
  </div>
</template>
