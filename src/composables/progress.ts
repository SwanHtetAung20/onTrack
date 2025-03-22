import { computed } from 'vue'
import { calculateActivityCompletionPercentage } from '@/activity'
import { calculateTrackedActivitySeconds, timelineItems } from '@/timeline-items'
import { getProgressColor } from '@/functions'
import type { Activity } from '@/constants'

export const useProgress = (activity: Activity) => {
  const trackedActivitySeconds = computed(() =>
    calculateTrackedActivitySeconds(timelineItems.value, activity),
  )

  const percentage = computed(() =>
    calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value),
  )

  const colorClass = computed(() => getProgressColor(percentage.value))

  return {
    trackedActivitySeconds,
    percentage,
    colorClass,
  }
}
