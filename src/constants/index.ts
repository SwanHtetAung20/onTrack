import { generatePeriodSelection } from '@/functions'
import { ICON_CHART_BAR, ICON_CLOCK, ICON_LIST_BULLET } from '@/icons'

export const PAGE_TIMELINE = 'timeline'
export const PAGE_ACTIVITIES = 'activities'
export const PAGE_PROGRESS = 'progress'
export const HOURS_IN_DAY = 24
export const MIDNIGHT_HOUR = 0
export const MINUTES_IN_HOUR = 60
export const SECONDS_IN_MINUTE = 60
export const MILLISECONDS_IN_SECOND = 1000
export const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR
export const SECONDS_IN_DAY = HOURS_IN_DAY * SECONDS_IN_HOUR
export const BUTTON_TYPE_DANGER = 'danger'
export const BUTTON_TYPE_NEUTRAL = 'neutral'
export const BUTTON_TYPE_PRIMARY = 'primary'
export const BUTTON_TYPE_SUCCESS = 'success'
export const BUTTON_TYPE_WARNING = 'warning'
export const LOW_PERCENTAGE = 33
export const MEDIUM_PERCENTAGE = 66
export const HUNDRED_PERCENTAGE = 100
export const APP_NAME = 'timeTracker'

export const BUTTON_TYPES = [
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_NEUTRAL,
  BUTTON_TYPE_PRIMARY,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
]

export interface NavItem {
  page: string
  icon: string
}

export const NAV_ITEMS: NavItem[] = [
  {
    page: PAGE_TIMELINE,
    icon: ICON_CLOCK,
  },
  {
    page: PAGE_ACTIVITIES,
    icon: ICON_LIST_BULLET,
  },
  {
    page: PAGE_PROGRESS,
    icon: ICON_CHART_BAR,
  },
]

export interface TimeLineItem {
  hour: number
  activityId: string | null
  activitySeconds: number
  isActive: boolean
}

export interface Activity {
  id: string
  name: string
  secondsToComplete: number
}

export interface SaveData {
  timelineItems: TimeLineItem[]
  activities: Activity[]
  lastActiveAt: Date
}

export const PERIOD_SELECT_OPTIONS = generatePeriodSelection()
