import { ref, onActivated, onDeactivated, watchEffect, computed } from 'vue'
import {
  MILLISECONDS_IN_SECOND,
  HUNDRED_PERCENTAGE,
  SECONDS_IN_DAY,
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
} from '@/constants'

const calculateSecondsSinceMidnight = () => {
  const now = new Date()
  return (
    SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() +
    SECONDS_IN_MINUTE * now.getMinutes() +
    now.getSeconds()
  )
}
export const useSecondsSinceMidnight = () => {
  const timer = ref<number | undefined>(undefined)

  const secondsSinceMidnight = ref<number>(calculateSecondsSinceMidnight())

  onActivated(() => {
    secondsSinceMidnight.value = calculateSecondsSinceMidnight()
    timer.value = setInterval(() => {
      secondsSinceMidnight.value += 5 * 60
    }, MILLISECONDS_IN_SECOND) as unknown as number
  })

  onDeactivated(() => clearInterval(timer.value))

  watchEffect(() => {
    if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
      secondsSinceMidnight.value = 0
    }
  })

  const secondsSinceMidnightInPercentage = computed(
    () => (HUNDRED_PERCENTAGE * secondsSinceMidnight.value) / SECONDS_IN_DAY,
  )

  return { secondsSinceMidnightInPercentage }
}
