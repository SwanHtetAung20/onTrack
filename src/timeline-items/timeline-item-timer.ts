import { ref } from 'vue'
import { MILLISECONDS_IN_SECOND, type TimeLineItem } from '@/constants'
import { updateTimelineItem, activeTimelineItem } from '.'

const timelineItemTimer = ref<number | false>(false)

export const startTimelineItemTimer = (timelineItem?: TimeLineItem) => {
  timelineItem = timelineItem ?? activeTimelineItem.value!
  updateTimelineItem(timelineItem, { isActive: true })
  timelineItemTimer.value = setInterval(() => {
    updateTimelineItem(timelineItem, { activitySeconds: timelineItem.activitySeconds + 1 })
  }, MILLISECONDS_IN_SECOND) as unknown as number
}

export const stopTimelineItemTimer = () => {
  updateTimelineItem(activeTimelineItem.value!, { isActive: false })
  if (timelineItemTimer.value !== false) {
    clearInterval(timelineItemTimer.value)
    timelineItemTimer.value = false
  }
}
export const resetTimelineItemTimer = (timelineItem: TimeLineItem) => {
  updateTimelineItem(timelineItem, { activitySeconds: 0 })
  if (activeTimelineItem.value) {
    stopTimelineItemTimer()
  }
}
