import type { TimeLineItem } from '@/constants'
import { ref, watch } from 'vue'
import { updateTimelineItem } from '@/timeline-items'

export const useStopWatch = (timelineItem: TimeLineItem) => {
  const seconds = ref<number>(timelineItem.activitySeconds)
  const isRunning = ref<boolean>(false)
  const intervalId = ref<number | undefined>(undefined)

  watch(
    () => timelineItem.activityId,
    () => updateTimelineItem(timelineItem, { activitySeconds: seconds.value }),
  )

  const start = () => {
    intervalId.value = setInterval(() => {
      seconds.value += 120

      updateTimelineItem(timelineItem, {
        activitySeconds: timelineItem.activitySeconds + 120,
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

    updateTimelineItem(timelineItem, {
      activitySeconds: timelineItem.activitySeconds - seconds.value,
    })

    seconds.value = 0
  }

  return {
    seconds,
    isRunning,
    start,
    pause,
    reset,
  }
}
