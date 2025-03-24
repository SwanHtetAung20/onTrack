import { ref, watchEffect } from 'vue'
import { MILLISECONDS_IN_SECOND, type TimeLineItem } from '@/constants'
import { updateTimelineItem, activeTimelineItem } from '.'
import { now } from '@/time'

export const timelineItemTimer = ref<number | false>(false)

export const startTimelineItemTimer = (timelineItem: TimeLineItem) => {
  updateTimelineItem(timelineItem, { isActive: true })
  timelineItemTimer.value = setInterval(() => {
    updateTimelineItem(timelineItem, { activitySeconds: timelineItem.activitySeconds + 1 })
  }, MILLISECONDS_IN_SECOND) as unknown as number
}

export const stopTimelineItemTimer = (timelineItem: TimeLineItem) => {
  updateTimelineItem(timelineItem, { isActive: false })
  if (timelineItemTimer.value !== false) {
    clearInterval(timelineItemTimer.value)
    timelineItemTimer.value = false
  }
}
export const resetTimelineItemTimer = (timelineItem: TimeLineItem) => {
  updateTimelineItem(timelineItem, { activitySeconds: 0 })
  stopTimelineItemTimer(timelineItem)
}

watchEffect(() => {
  if (activeTimelineItem.value && activeTimelineItem.value.hour !== now.value.getHours()) {
    stopTimelineItemTimer(activeTimelineItem.value)
  }
})
