<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import {
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_DANGER,
  type TimeLineItem,
} from '@/constants'
import { formatSecond } from '@/functions'
import { isTimelineItemValid } from '@/validator'
import {
  resetTimelineItemTimer,
  startTimelineItemTimer,
  stopTimelineItemTimer,
} from '../timeline-items/timeline-item-timer'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/icons'
import { now } from '@/time'
import { activeTimelineItem } from '@/timeline-items'

defineProps({
  timelineItem: {
    type: Object as () => TimeLineItem,
    required: true,
    validator: isTimelineItemValid,
  },
})
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton
      :type="BUTTON_TYPE_DANGER"
      @click="resetTimelineItemTimer(timelineItem)"
      :disabled="!timelineItem.activitySeconds"
    >
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded font-mono text-3xl bg-gray-100 px-2">
      {{ formatSecond(timelineItem.activitySeconds) }}
    </div>
    <BaseButton
      v-if="timelineItem === activeTimelineItem"
      :type="BUTTON_TYPE_WARNING"
      @click="stopTimelineItemTimer"
    >
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>
    <BaseButton
      v-else
      :type="BUTTON_TYPE_SUCCESS"
      @click="startTimelineItemTimer(timelineItem)"
      :disabled="timelineItem.hour !== now.getHours()"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>
