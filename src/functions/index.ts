import { isPageValid } from '@/validator'
import {
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
  PAGE_TIMELINE,
  HOUR_IN_DAY,
  MIDNIGHT_HOUR,
  type Activity,
  SECONDS_IN_HOUR,
} from '../constants'

export const normalizePageHash = (): string => {
  const page = window.location.hash.slice(1)
  if (isPageValid(page)) {
    return page
  }
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}

export const generateTimelineItems = (): Array<{ hour: number }> => {
  const timelineItems = []

  for (let hour = MIDNIGHT_HOUR; hour < HOUR_IN_DAY; hour++) {
    timelineItems.push({ hour })
  }
  return timelineItems
}

export const generateActivitySelectOptions = (activities: string[]) => {
  return activities.map((label, value) => ({
    label,
    value,
  }))
}

export const generateActivities = (): Activity[] => {
  return [
    {
      id: id(),
      name: 'Reading',
      secondsToComplete: 0 * SECONDS_IN_HOUR,
    },
    {
      id: id(),
      name: 'Training',
      secondsToComplete: 1 * SECONDS_IN_HOUR,
    },
    {
      id: id(),
      name: 'Coding',
      secondsToComplete: 2 * SECONDS_IN_HOUR,
    },
  ]
}

const id = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}
