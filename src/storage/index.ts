import { APP_NAME, type TimeLineItem } from '@/constants'
import { today, isToday, toSeconds } from '@/time'
import { activities } from '@/activity'
import { timelineItems } from '@/timeline-items'
import { endOfHour } from '@/time'

export const saveState = () => {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today(),
    }),
  )
}

const calculateIdleSeconds = (lastActiveAt: Date): number => {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today().getTime() - lastActiveAt.getTime())
    : toSeconds(endOfHour(lastActiveAt) - lastActiveAt.getTime())
}

const syncIdleSeconds = (timelineItems: TimeLineItem[], lastActiveAt: Date) => {
  const activeTimelineItem = timelineItems.find(({ isActive }) => isActive)

  if (activeTimelineItem) {
    activeTimelineItem.activitySeconds += calculateIdleSeconds(lastActiveAt)
  }
  return timelineItems
}

export const loadState = () => {
  const serializedState = localStorage.getItem(APP_NAME)
  const state = serializedState ? JSON.parse(serializedState) : {}
  activities.value = state.activities || activities.value
  const lastActiveAt = new Date(state.lastActiveAt)
  timelineItems.value = isToday(lastActiveAt)
    ? syncIdleSeconds(state.timelineItems, lastActiveAt)
    : timelineItems.value
}
