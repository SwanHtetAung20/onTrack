import { computed } from 'vue'
import { calculateCompletionPercentage, trackedActivities } from '@/activity'
import { calculateTrackedActivitySeconds, timelineItems } from '@/timeline-items'
import { getProgressColor } from '@/functions'

export const useTotalProgress = () => {
  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) =>
        Math.min(
          calculateTrackedActivitySeconds(timelineItems.value, activity),
          activity.secondsToComplete,
        ),
      )
      .reduce((total, seconds) => total + seconds, 0)
  })

  const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value))

  const colorClass = computed(() => getProgressColor(percentage.value))

  return {
    percentage,
    colorClass,
  }
}
