import { ref, computed } from 'vue'
import {
  MILLISECONDS_IN_SECOND,
  HUNDRED_PERCENTAGE,
  SECONDS_IN_DAY,
  SECONDS_IN_HOUR,
} from '@/constants'

export const today = () => {
  return new Date()
}

export const tomorrow = () => {
  const tomorrow = today()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

export const now = ref<Date>(today())

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(
  () => (now.value.getTime() - midnight.value) / MILLISECONDS_IN_SECOND,
)

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENTAGE * secondsSinceMidnight.value) / SECONDS_IN_DAY,
)

export const startCurrentDateTimer = () => {
  setInterval(() => (now.value = today()), MILLISECONDS_IN_SECOND) as unknown as number
}

export const isToday = (date: Date) => {
  return date.toDateString() == today().toDateString()
}

export const endOfHour = (date: Date): number => {
  const endOfHour = new Date(date)

  endOfHour.setTime(endOfHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND)

  endOfHour.setMinutes(0, 0, 0)
  return endOfHour.getTime()
}

export const toSeconds = (milliseconds: number): number => {
  return Math.round(milliseconds / MILLISECONDS_IN_SECOND)
}
