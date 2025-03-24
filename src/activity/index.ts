import { ref, computed } from 'vue'
import { id } from '@/functions'
import { type Activity } from '@/constants'

export const activities = ref<Activity[]>([])

const generateActivitySelectOptions = (activities: Activity[]) => {
  return activities.map((activity) => ({
    value: activity.id,
    label: activity.name,
  }))
}

export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete),
)

const totalActivitySecondsToComplete = computed((): number => {
  return trackedActivities.value
    .map(({ secondsToComplete }) => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0)
})

export const calculateActivityCompletionPercentage = (
  { secondsToComplete }: Partial<Activity>,
  trackedSeconds: number,
): number => {
  return Math.floor((trackedSeconds * 100) / secondsToComplete)
}

export const calculateCompletionPercentage = (totalTrackedSeconds: number): number => {
  return Math.floor((totalTrackedSeconds * 100) / totalActivitySecondsToComplete.value)
}

export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

export const deleteActivityItem = (deleteActivity: Activity): void => {
  const index = activities.value.findIndex((activity) => activity.id === deleteActivity.id)
  if (index !== -1) {
    activities.value.splice(index, 1)
  }
}

export const createActivity = (name: string): void => {
  activities.value.push({
    id: id(),
    name,
    secondsToComplete: 0,
  })
}

export const setSecondsToComplete = (activity: Activity, secondsToComplete: number): void => {
  activity.secondsToComplete = secondsToComplete || 0
}
