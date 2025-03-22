<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import {
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_DANGER,
  type TimeLineItem,
} from '@/constants'
import { formatSecond, currentHour } from '@/functions'
import { isTimelineItemValid } from '@/validator'
import { ref, watch } from 'vue'
import { updateTimelineItem } from '@/timeline-items'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/icons'

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
  () => updateTimelineItem(props.timelineItem, { activitySeconds: seconds.value }),
)

const start = () => {
  intervalId.value = setInterval(() => {
    seconds.value += 120

    updateTimelineItem(props.timelineItem, {
      activitySeconds: props.timelineItem.activitySeconds + 120,
    })
  }, 1000) as unknown as number
  isRunning.value = true
}

const pause = () => {
  clearInterval(intervalId.value)
  isRunning.value = false
}

const reset = () => {
  pause()

  updateTimelineItem(props.timelineItem, {
    activitySeconds: props.timelineItem.activitySeconds - seconds.value,
  })

  seconds.value = 0
}
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" @click="reset" :disabled="!seconds">
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded font-mono text-3xl bg-gray-100 px-2">
      {{ formatSecond(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="pause">
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" @click="start" :disabled="isStartButtonDisabled">
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>
