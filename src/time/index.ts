import { ref, computed } from 'vue'
import {
  MILLISECONDS_IN_SECOND,
  HUNDRED_PERCENTAGE,
  SECONDS_IN_DAY,
  SECONDS_IN_MINUTE,
} from '@/constants'

const timer = ref<number | undefined>(undefined)

const date = new Date()
date.setHours(0, 0)

export const now = ref<Date>(date)

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(
  () => (now.value.getTime() - midnight.value) / MILLISECONDS_IN_SECOND,
)

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENTAGE * secondsSinceMidnight.value) / SECONDS_IN_DAY,
)

export const startTimer = () => {
  now.value = date //new Date()
  timer.value = setInterval(() => {
    now.value = new Date(now.value.getTime() + SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND)
  }, MILLISECONDS_IN_SECOND) as unknown as number
}

export const stopTimer = () => {
  clearInterval(timer.value)
}
