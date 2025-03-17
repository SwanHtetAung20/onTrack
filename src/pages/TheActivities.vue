<script setup lang="ts">
import ActivityItems from '@/components/ActivityItems.vue'
import { isActivityItemsValid, isActivityItemValid } from '@/validator'
import TheActivityForm from '@/components/TheActivityForm.vue'

defineProps({
  activities: {
    type: Array as () => string[],
    default: () => [],
    validator: isActivityItemsValid,
  },
})

const emit = defineEmits({
  deleteActivity: isActivityItemValid,
  createActivity: isActivityItemValid,
})

const createActivity = (activity: string) => {
  emit('createActivity', activity)
}
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
    <TheActivityForm @submit="createActivity" />
  </div>
</template>
