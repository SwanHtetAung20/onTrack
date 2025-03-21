<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import { TrashIcon } from '@heroicons/vue/24/solid'
import BaseSelect from './BaseSelect.vue'
import { isActivityItemValid } from '@/validator'
import { BUTTON_TYPE_DANGER, type Activity, PERIOD_SELECT_OPTIONS } from '@/constants'
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue'
import { setSecondsToComplete, deleteActivityItem } from '@/activity'
import { resetTimelineActivity } from '@/timeline-items'

defineProps({
  activity: {
    type: Object as () => Activity,
    required: true,
    validator: isActivityItemValid,
  },
})

const deleteAndResetActivity = (activity: Activity) => {
  deleteActivityItem(activity)
  resetTimelineActivity(activity)
}
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity(activity)">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="text-xl truncate">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="font-mono grow"
        placeholder="hh:mm"
        :options="PERIOD_SELECT_OPTIONS"
        :selected="activity.secondsToComplete || null"
        @select="setSecondsToComplete(activity, Number($event))"
      />
      <ActivitySecondsToComplete v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
