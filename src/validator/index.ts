import {
  NAV_ITEMS,
  HOURS_IN_DAY,
  type TimeLineItem,
  MIDNIGHT_HOUR,
  BUTTON_TYPES,
  type Activity,
} from '@/constants'
import { ICONS } from '@/icons'

export const isPageValid = (page: string): boolean => {
  return NAV_ITEMS.some((navItem) => navItem.page === page)
}

export const isIconValid = (icon: string): boolean => {
  return Object.keys(ICONS).includes(icon)
}

export const isNavItemValid = (navItem: { page: string; icon: string }): boolean => {
  return NAV_ITEMS.includes(navItem)
}

export const validateTimelineItems = (timelineItems: TimeLineItem[]) => {
  return timelineItems.every(isTimelineItemValid)
}

export const isTimelineItemValid = (timelineItem: TimeLineItem): boolean => {
  return (
    typeof timelineItem.hour === 'number' &&
    timelineItem.hour >= MIDNIGHT_HOUR &&
    timelineItem.hour <= HOURS_IN_DAY
  )
}

export const validateSelectOptions = (options: { value: number; label: string }[]) => {
  return options.every(
    (opt) =>
      (typeof opt.value === 'string' || typeof opt.value === 'number') &&
      typeof opt.label === 'string' &&
      opt.label !== '',
  )
}

export const isActivityItemsValid = (activityItems: Activity[]): boolean => {
  return activityItems.every(isActivityItemValid)
}

export const isActivityItemValid = ({ id, name, secondsToComplete }: Activity): boolean => {
  return [
    typeof id === 'string' && id.length > 0,
    typeof name === 'string' && name.length > 0,
    typeof secondsToComplete === 'number' && secondsToComplete >= 0,
  ].every(Boolean)
}

export const isButtonTypeValid = (value: string): boolean => {
  return BUTTON_TYPES.includes(value)
}

export const isActivity = (value: Activity | null): value is Activity => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'secondsToComplete' in value
  )
}
