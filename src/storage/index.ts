import { APP_NAME } from '@/constants'
import { today } from '@/time'
import { activities, initializeActivities } from '@/activity'
import { activeTimelineItem, initializeTimelineItems, timelineItems } from '@/timeline-items'
import { startTimelineItemTimer, stopTimelineItemTimer } from '@/timeline-items/timeline-item-timer'

const saveState = (): void => {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today(),
    }),
  )
}

const loadFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(APP_NAME) ?? '{}')
}

const loadState = (): void => {
  const state = loadFromLocalStorage()

  initializeActivities(state)
  initializeTimelineItems(state)
}

export const syncState = (shouldLoad: boolean = true): void => {
  shouldLoad ? loadState() : saveState()

  if (activeTimelineItem.value) {
    shouldLoad
      ? startTimelineItemTimer(activeTimelineItem.value)
      : stopTimelineItemTimer(activeTimelineItem.value)
  }
}
