import { isPageValid } from '@/validator'
import {
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
  PAGE_TIMELINE,
  HOUR_IN_DAY,
  MIDNIGHT_HOUR,
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
