import type { TimeLineItem } from '@/constants'
import { ref } from 'vue'

export const useStopWatch = (timelineItem: TimeLineItem) => {
  const seconds = ref<number>(timelineItem.activitySeconds)
  const isRunning = ref<boolean>(false)
  const intervalId = ref<number | undefined>(undefined)

  const start = () => {
    intervalId.value = setInterval(() => {
      seconds.value += 120
    }, 1000) as unknown as number
    isRunning.value = true
  }

  const pause = () => {
    clearInterval(intervalId.value)
    isRunning.value = false
  }

  const reset = () => {
    pause()
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
