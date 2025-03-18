import { generatePeriodSelection } from '@/functions'
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/solid'

export const PAGE_TIMELINE = 'timeline'
export const PAGE_ACTIVITIES = 'activities'
export const PAGE_PROGRESS = 'progress'
export const HOUR_IN_DAY = 24
export const MIDNIGHT_HOUR = 0
export const SECONDS_IN_HOUR = 3600
export const MINUTES_IN_HOUR = 60
export const BUTTON_TYPE_DANGER = 'danger'
export const BUTTON_TYPE_NEUTRAL = 'neutral'
export const BUTTON_TYPE_PRIMARY = 'primary'

export const BUTTON_TYPES = [BUTTON_TYPE_DANGER, BUTTON_TYPE_NEUTRAL, BUTTON_TYPE_PRIMARY]

export const NAV_ITEMS = {
  [PAGE_TIMELINE]: ClockIcon,
  [PAGE_ACTIVITIES]: ListBulletIcon,
  [PAGE_PROGRESS]: ChartBarIcon,
}

export interface TimeLineItem {
  hour: number
  activityId: string | null
}

export interface Activity {
  id: string
  name: string
  secondsToComplete: number
}

const PERIOD_IN_MINUTES = [
  15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
]

export const PERIOD_SELECT_OPTIONS = generatePeriodSelection(PERIOD_IN_MINUTES as Array<number>)
