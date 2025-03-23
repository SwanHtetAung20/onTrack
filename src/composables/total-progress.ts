import { computed } from 'vue'
import { calculateCompletionPercentage, trackedActivities } from '@/activity'
import { calculateTrackedActivitySeconds, timelineItems } from '@/timeline-items'
import { getProgressColor } from '@/functions'

export const useTotalProgress = () => {
  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value.reduce((total, activity) => {
      let trackedSeconds = calculateTrackedActivitySeconds(timelineItems.value, activity)

      trackedSeconds =
        trackedSeconds < activity.secondsToComplete ? trackedSeconds : activity.secondsToComplete
      return total + trackedSeconds
    }, 0)
  })

  const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value))

  const colorClass = computed(() => getProgressColor(percentage.value))

  return {
    percentage,
    colorClass,
  }
}
