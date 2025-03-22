import { ref, computed } from 'vue'
import { id } from '@/functions'
import { SECONDS_IN_HOUR, type Activity } from '@/constants'
import { getTotalActivitySeconds } from '@/timeline-items'

const generateActivities = (): Activity[] => {
  return ['Reading', 'Training', 'Coding'].map((name, index) => ({
    id: id(),
    name,
    secondsToComplete: 15 * 60, //index * SECONDS_IN_HOUR,
  }))
}

export const activities = ref(generateActivities())

const generateActivitySelectOptions = (activities: Activity[]) => {
  return activities.map((activity) => ({
    value: activity.id,
    label: activity.name,
  }))
}

export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete),
)

export const getActivityProgress = (activity: Activity): number => {
  return Math.floor((getTotalActivitySeconds(activity) * 100) / activity.secondsToComplete)
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
