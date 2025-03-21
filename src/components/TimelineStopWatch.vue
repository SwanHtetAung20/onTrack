<script setup lang="ts">
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/solid'
import BaseButton from './BaseButton.vue'
import {
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_DANGER,
  type TimeLineItem,
} from '@/constants'
import { formatSecond, currentHour } from '@/functions'
import { isTimelineItemValid } from '@/validator'
import { ref, watch } from 'vue'
import { updateTimelineItemActivitySeconds } from '@/timeline-items'

const props = defineProps({
  timelineItem: {
    type: Object as () => TimeLineItem,
    required: true,
    validator: isTimelineItemValid,
  },
})

const seconds = ref<number>(props.timelineItem.activitySeconds)
const isRunning = ref<boolean>(false)
const intervalId = ref<number | undefined>(undefined)

const isStartButtonDisabled = props.timelineItem.hour !== currentHour()

watch(
  () => props.timelineItem.activityId,
  () => updateTimelineItemActivitySeconds(props.timelineItem, seconds.value),
)

const start = () => {
  intervalId.value = setInterval(() => {
    seconds.value++
    if (updateTimelineItemActivitySeconds) {
      updateTimelineItemActivitySeconds(props.timelineItem, props.timelineItem.activitySeconds + 1)
    }
  }, 1000) as unknown as number
  isRunning.value = true
}

const pause = () => {
  clearInterval(intervalId.value)
  isRunning.value = false
}

const reset = () => {
  pause()
  if (updateTimelineItemActivitySeconds) {
    updateTimelineItemActivitySeconds(
      props.timelineItem,
      props.timelineItem.activitySeconds - seconds.value,
    )
  }
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
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="pause">
      <PauseIcon class="h-8" />
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" @click="start" :disabled="isStartButtonDisabled">
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>
