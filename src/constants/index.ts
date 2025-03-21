import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/solid'
import type { FunctionalComponent } from 'vue'
import { generatePeriodSelection } from '@/functions'

export const PAGE_TIMELINE = 'timeline'
export const PAGE_ACTIVITIES = 'activities'
export const PAGE_PROGRESS = 'progress'
export const HOURS_IN_DAY = 24
export const MIDNIGHT_HOUR = 0
export const SECONDS_IN_HOUR = 3600
export const MINUTES_IN_HOUR = 60
export const SECONDS_IN_MINUTE = 60
export const MILLISECONDS_IN_SECOND = 1000
export const BUTTON_TYPE_DANGER = 'danger'
export const BUTTON_TYPE_NEUTRAL = 'neutral'
export const BUTTON_TYPE_PRIMARY = 'primary'
export const BUTTON_TYPE_SUCCESS = 'success'
export const BUTTON_TYPE_WARNING = 'warning'

export const BUTTON_TYPES = [
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_NEUTRAL,
  BUTTON_TYPE_PRIMARY,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
]

export interface NavItem {
  page: string
  icon: FunctionalComponent
}

export const NAV_ITEMS: NavItem[] = [
  {
    page: PAGE_TIMELINE,
    icon: ClockIcon,
  },
  {
    page: PAGE_ACTIVITIES,
    icon: ListBulletIcon,
  },
  {
    page: PAGE_PROGRESS,
    icon: ChartBarIcon,
  },
]

export interface TimeLineItem {
  hour: number
  activityId: string | null
  activitySeconds: number
}

export interface Activity {
  id: string
  name: string
  secondsToComplete: number
}

export const PERIOD_SELECT_OPTIONS = generatePeriodSelection()
