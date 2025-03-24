import { ref, computed } from 'vue'
import { MILLISECONDS_IN_SECOND, HUNDRED_PERCENTAGE, SECONDS_IN_DAY } from '@/constants'

const timer = ref<number | undefined>(undefined)

export const today = () => {
  const today = new Date()
  //today.setHours(0, 0)
  return today
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

export const startTimer = () => {
  now.value = today()
  timer.value = setInterval(() => {
    now.value = new Date(now.value.getTime() + MILLISECONDS_IN_SECOND)
  }, MILLISECONDS_IN_SECOND) as unknown as number
}

export const stopTimer = () => {
  clearInterval(timer.value)
}

export const isToday = (date: Date) => {
  return date.toDateString() == today().toDateString()
}
