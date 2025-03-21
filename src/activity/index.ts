import { ref, computed } from 'vue'
import { id } from '@/functions'
import { SECONDS_IN_HOUR, type Activity } from '@/constants'

const generateActivities = (): Activity[] => {
  return ['Reading', 'Training', 'Coding'].map((name, index) => ({
    id: id(),
    name,
    secondsToComplete: index * SECONDS_IN_HOUR,
  }))
}

export const activities = ref(generateActivities())

const generateActivitySelectOptions = (activities: Activity[]) => {
  return activities.map((activity) => ({
    value: activity.id,
    label: activity.name,
  }))
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
