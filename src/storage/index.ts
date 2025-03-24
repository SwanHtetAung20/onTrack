import { APP_NAME } from '@/constants'
import { today, isToday } from '@/time'
import { activities } from '@/activity'
import { timelineItems } from '@/timeline-items'

export const saveState = () => {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      date: today(),
    }),
  )
}

export const loadState = () => {
  const serializedState = localStorage.getItem(APP_NAME)
  const state = serializedState ? JSON.parse(serializedState) : {}
  timelineItems.value = isToday(new Date(state.date)) ? state.timelineItems : timelineItems.value
  activities.value = state.activities || activities.value
}
