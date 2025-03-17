import { isPageValid } from '@/validator'
import {
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
  PAGE_TIMELINE,
  HOUR_IN_DAY,
  MIDNIGHT_HOUR,
  type Activity,
  SECONDS_IN_HOUR,
  type TimeLineItem,
} from '../constants'

export const normalizePageHash = (): string => {
  const page = window.location.hash.slice(1)
  if (isPageValid(page)) {
    return page
  }
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}

export const generateTimelineItems = (): TimeLineItem[] => {
  const timelineItems = []

  for (let hour = MIDNIGHT_HOUR; hour < HOUR_IN_DAY; hour++) {
    timelineItems.push({ hour, activityId: null })
  }
  return timelineItems
}

export const generateActivitySelectOptions = (activities: Activity[]) => {
  return activities.map((activity) => ({
    value: activity.id,
    label: activity.name,
  }))
}

export const generateActivities = (): Activity[] => {
  return ['Reading', 'Training', 'Coding'].map((name, index) => ({
    id: id(),
    name,
    secondsToComplete: index * SECONDS_IN_HOUR,
  }))
}

export const id = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}
