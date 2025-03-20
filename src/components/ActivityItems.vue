<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import { TrashIcon } from '@heroicons/vue/24/solid'
import BaseSelect from './BaseSelect.vue'
import { isActivityItemValid } from '@/validator'
import { BUTTON_TYPE_DANGER, type Activity } from '@/constants'
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue'
import { inject } from 'vue'

defineProps({
  activity: {
    type: Object as () => Activity,
    required: true,
    validator: isActivityItemValid,
  },
})

const emit = defineEmits({
  delete() {
    return true
  },
  setSecondsToComplete(value: number | null | string) {
    return typeof value === 'number' || value === null || typeof value === 'string'
  },
})

const periodSelection = inject<Array<{ value: number; label: string }>>('periodSelection', [])
const setSecondsToComplete = inject<(activity: Activity, secondsToComplete: number) => void>(
  'setSecondsToComplete',
  () => {},
)
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="text-xl truncate">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="font-mono grow"
        placeholder="hh:mm"
        :options="periodSelection"
        :selected="activity.secondsToComplete || null"
        @select="setSecondsToComplete(activity, Number($event) || 0)"
      />
      <ActivitySecondsToComplete v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
