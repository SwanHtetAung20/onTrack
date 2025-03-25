import { APP_NAME, type TimeLineItem } from '@/constants'
import { today, isToday, toSeconds } from '@/time'
import { activities } from '@/activity'
import { activeTimelineItem, resetTimelineItems, timelineItems } from '@/timeline-items'
import { endOfHour } from '@/time'
import { startTimelineItemTimer, stopTimelineItemTimer } from '@/timeline-items/timeline-item-timer'

export const saveState = (): void => {
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

export const loadState = (): void => {
  const serializedState = localStorage.getItem(APP_NAME)
  const state = serializedState ? JSON.parse(serializedState) : {}
  activities.value = state.activities || activities.value
  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? timelineItems.value

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    timelineItems.value = syncIdleSeconds(state.timelineItems, lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    timelineItems.value = resetTimelineItems(state.timelineItems)
  }
}

export const syncState = (shouldLoad: boolean = true): void => {
  shouldLoad ? loadState() : saveState()

  if (activeTimelineItem.value) {
    shouldLoad
      ? startTimelineItemTimer(activeTimelineItem.value)
      : stopTimelineItemTimer(activeTimelineItem.value)
  }
}
