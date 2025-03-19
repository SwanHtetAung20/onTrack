<script setup lang="ts">
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/solid'
import BaseButton from './BaseButton.vue'
import { BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING, BUTTON_TYPE_DANGER } from '@/constants'
import { formatSecond } from '@/functions'
import { ref } from 'vue'

const props = defineProps({
  seconds: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0,
  },
  hour: {
    type: Number,
    required: true,
    validator: (value: number) => value >= 0,
  },
})

const seconds = ref<number>(props.seconds)
const isRunning = ref<boolean>(false)
const intervalId = ref<number | undefined>(undefined)

const isStartButtonDisabled = props.hour !== new Date().getHours()

const emit = defineEmits({
  updateSeconds: (value: number) => typeof value === 'number',
})

const start = () => {
  intervalId.value = setInterval(() => {
    seconds.value++
    emit('updateSeconds', 1)
  }, 1000) as unknown as number
  isRunning.value = true
}

const pause = () => {
  clearInterval(intervalId.value)
  isRunning.value = false
}

const reset = () => {
  pause()
  emit('updateSeconds', -seconds.value)
  seconds.value = 0
}
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" @click="reset" :disabled="!seconds">
      <ArrowPathIcon class="h-8" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded font-mono text-3xl bg-gray-100 px-2">
      {{ formatSecond(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_SUCCESS" @click="pause">
      <PauseIcon class="h-8" />
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_WARNING" @click="start" :disabled="isStartButtonDisabled">
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>
