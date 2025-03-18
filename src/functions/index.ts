import { isPageValid } from '@/validator'
import {
  PAGE_TIMELINE,
  HOURS_IN_DAY,
  SECONDS_IN_MINUTE,
  type Activity,
  SECONDS_IN_HOUR,
  type TimeLineItem,
  MINUTES_IN_HOUR,
  MILLISECONDS_IN_SECOND,
} from '../constants'

export const normalizePageHash = (): string => {
  const page = window.location.hash.slice(1)
  if (isPageValid(page)) {
    return page
  }
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}

export const generateTimelineItems = (activities: Activity[]): TimeLineItem[] => {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
    activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR,
  }))
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

export const generatePeriodSelection = (periodInMinutes: Array<number>) => {
  return periodInMinutes.map((periodInMinute) => ({
    value: periodInMinute * SECONDS_IN_HOUR,
    label: generatePeriodSelectionLabel(periodInMinute),
  }))
}

const generatePeriodSelectionLabel = (periodInMinute: number) => {
  const hours = Math.floor(periodInMinute / MINUTES_IN_HOUR)
    .toString()
    .padStart(2, '0')
  const minutes = (periodInMinute % MINUTES_IN_HOUR).toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export const formatSecond = (second: number) => {
  const date = new Date()

  date.setTime(Math.abs(second) * MILLISECONDS_IN_SECOND)

  const utc = date.toUTCString()

  // *  utc = "Thu, 01 Jan 1970 00:01:00 GMT"

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}
