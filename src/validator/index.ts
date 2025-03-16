import { NAV_ITEMS, HOUR_IN_DAY, type TimeLineItem, MIDNIGHT_HOUR } from '@/constants'

export const isPageValid = (page: string): boolean => {
  return Object.keys(NAV_ITEMS).includes(page)
}

export const validateTimelineItems = (timelineItems: TimeLineItem[]) => {
  return timelineItems.every(isTimelineItemValid)
}

export const isTimelineItemValid = (timelineItem: TimeLineItem): boolean => {
  return (
    typeof timelineItem.hour === 'number' &&
    timelineItem.hour >= MIDNIGHT_HOUR &&
    timelineItem.hour <= HOUR_IN_DAY
  )
}

export const validateSelectOptions = (options: { value: number; label: string }[]) => {
  return options.every((opt) => typeof opt.value === 'number' && typeof opt.label === 'string')
}
