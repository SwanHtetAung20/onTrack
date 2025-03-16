import { NAV_ITEMS, HOUR_IN_DAY, type TimeLineItem, MIDNIGHT_HOUR, BUTTON_TYPES } from '@/constants'

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
  return options.every(
    (opt) => typeof opt.value === 'number' && typeof opt.label === 'string' && opt.label !== '',
  )
}

export const isActivityItemsValid = (activityItems: string[]): boolean => {
  return activityItems.every(isActivityItemValid)
}

export const isActivityItemValid = (value: string): boolean => {
  return typeof value === 'string' && value.length > 0
}

export const isButtonTypeValid = (value: string): boolean => {
  return BUTTON_TYPES.includes(value)
}
