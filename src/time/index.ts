import { ref, computed } from 'vue'
import { MILLISECONDS_IN_SECOND, HUNDRED_PERCENTAGE, SECONDS_IN_DAY } from '@/constants'

const timer = ref<number | undefined>(undefined)
export const now = ref<Date>(new Date())

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(
  () => (now.value.getTime() - midnight.value) / MILLISECONDS_IN_SECOND,
)

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENTAGE * secondsSinceMidnight.value) / SECONDS_IN_DAY,
)

export const startTimer = () => {
  now.value = new Date()
  timer.value = setInterval(() => {
    now.value = new Date(now.value.getTime() + 5 * 60 * MILLISECONDS_IN_SECOND)
  }, MILLISECONDS_IN_SECOND) as unknown as number
}

export const stopTimer = () => {
  clearInterval(timer.value)
}
