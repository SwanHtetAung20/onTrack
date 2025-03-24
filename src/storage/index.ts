import { APP_NAME, MILLISECONDS_IN_SECOND, SECONDS_IN_HOUR, type TimeLineItem } from '@/constants'
import { today, isToday } from '@/time'
import { activities } from '@/activity'
import { timelineItems } from '@/timeline-items'

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

const getEndOfIdleHour = (lastActiveAt: Date): number => {
  const endOfIdleHour = new Date(lastActiveAt)

  endOfIdleHour.setTime(endOfIdleHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND)

  endOfIdleHour.setMinutes(0, 0, 0)
  console.log('endOfIdleHour', endOfIdleHour)
  return endOfIdleHour.getTime()
}

const calculateIdleSeconds = (lastActiveAt: Date): number => {
  let idleMilliseconds = today().getTime() - lastActiveAt.getTime()

  if (lastActiveAt.getHours() !== today().getHours()) {
    idleMilliseconds = getEndOfIdleHour(lastActiveAt) - lastActiveAt.getTime()
  }

  return idleMilliseconds / MILLISECONDS_IN_SECOND
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
