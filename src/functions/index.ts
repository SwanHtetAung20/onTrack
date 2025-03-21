import {
  HOURS_IN_DAY,
  SECONDS_IN_MINUTE,
  type Activity,
  SECONDS_IN_HOUR,
  type TimeLineItem,
  MINUTES_IN_HOUR,
  MILLISECONDS_IN_SECOND,
} from '../constants'

export const generateTimelineItems = (activities: Activity[]): TimeLineItem[] => {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: [0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3].id : null,
    activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
    // activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
    // activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR,
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

export const generatePeriodSelection = () => {
  const periodInMinutes = [
    15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
  ]
  return periodInMinutes.map((periodInMinute) => ({
    value: periodInMinute * SECONDS_IN_MINUTE,
    label: generatePeriodSelectionLabel(periodInMinute),
  }))
}

const generatePeriodSelectionLabel = (periodInMinute: number): string => {
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
  //return utc.substring(utc.indexOf(':') - 2, utc.length - 3)

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}

export const getTotalActivitySeconds = (
  activity: Activity,
  timelineItems: TimeLineItem[],
): number => {
  return timelineItems
    .filter((item) => item.activityId === activity.id)
    .reduce((totalSeconds, item) => Math.round(item.activitySeconds + totalSeconds), 0)
}

export const currentHour = (): number => {
  return new Date().getHours()
}
