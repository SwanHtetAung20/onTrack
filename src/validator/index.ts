import { NAV_ITEMS, HOUR_IN_DAY, type TimeLineItem } from '@/constants'

export const isPageValid = (page: string): boolean => {
  return Object.keys(NAV_ITEMS).includes(page)
}

export const isTimelineItemValid = (timelineItem: TimeLineItem): boolean => {
  return (
    typeof timelineItem.hour === 'number' &&
    timelineItem.hour >= 0 &&
    timelineItem.hour <= HOUR_IN_DAY
  )
}
