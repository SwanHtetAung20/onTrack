import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE, HOUR_IN_DAY } from '../constants'

export const normalizePageHash = (): string => {
  const hash = window.location.hash.slice(1)
  if ([PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE].includes(hash)) {
    return hash
  }
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}

export const generateTimelineItems = (): Array<{ hour: number }> => {
  const timelineItems = []

  for (let hour = 0; hour < HOUR_IN_DAY; hour++) {
    timelineItems.push({ hour })
  }
  return timelineItems
}
