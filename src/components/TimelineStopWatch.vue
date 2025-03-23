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
import { useStopWatch } from '@/composables/stopWatch'

const props = defineProps({
  timelineItem: {
    type: Object as () => TimeLineItem,
    required: true,
    validator: isTimelineItemValid,
  },
})

const { start, pause, reset, seconds, isRunning } = useStopWatch(props.timelineItem)
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
    <BaseButton
      v-else
      :type="BUTTON_TYPE_SUCCESS"
      @click="start"
      :disabled="timelineItem.hour !== currentHour()"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>
