<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'
import { TrashIcon } from '@heroicons/vue/24/solid'
import BaseSelect from './BaseSelect.vue'
import { isActivityItemValid } from '@/validator'
import { BUTTON_TYPE_DANGER } from '@/constants'

defineProps({
  activity: {
    type: String,
    required: true,
    validator: isActivityItemValid,
  },
})

const periodSelectOptions = [
  { value: 1, label: '0:15' },
  { value: 2, label: '0:30' },
  { value: 3, label: '0:45' },
]

const secondsToComplete = ref<number>()
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="text-xl truncate">{{ activity }}</span>
    </div>
    <div>
      <BaseSelect
        class="font-mono"
        placeholder="h:mm"
        :options="periodSelectOptions"
        :selected="secondsToComplete"
        @select="secondsToComplete = $event"
      />
    </div>
  </li>
</template>
