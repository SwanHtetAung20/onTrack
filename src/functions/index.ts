import {
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  MILLISECONDS_IN_SECOND,
  LOW_PERCENTAGE,
  MEDIUM_PERCENTAGE,
  HUNDRED_PERCENTAGE,
} from '../constants'

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

export const currentHour = (): number => {
  return new Date().getHours()
}

export const getProgressColor = (percentage: number): string => {
  if (percentage < LOW_PERCENTAGE) return 'bg-red-500'
  if (percentage < MEDIUM_PERCENTAGE) return 'bg-yellow-500'
  if (percentage < HUNDRED_PERCENTAGE) return 'bg-blue-500'
  return 'bg-green-500'
}
