import {
  PlayIcon as Play,
  PauseIcon as Pause,
  PlusIcon as Plus,
  XMarkIcon as XMark,
  TrashIcon as Trash,
  ClockIcon as Clock,
  ChartBarIcon as ChartBar,
  ArrowPathIcon as ArrowPath,
  ListBulletIcon as ListBullet,
  CheckCircleIcon as CheckCircle,
} from '@heroicons/vue/24/solid'
import type { Component } from 'vue'

export const ICON_PLAY = 'Play'
export const ICON_PAUSE = 'Pause'
export const ICON_PLUS = 'Plus'
export const ICON_X_MARK = 'XMark'
export const ICON_TRASH = 'Trash'
export const ICON_CLOCK = 'Clock'
export const ICON_CHART_BAR = 'ChartBar'
export const ICON_ARROW_PATH = 'ArrowPath'
export const ICON_LIST_BULLET = 'ListBullet'
export const ICON_CHECK_CIRCLE = 'CheckCircle'

export const ICONS: Record<string, Component> = {
  [ICON_PLAY]: Play,
  [ICON_PAUSE]: Pause,
  [ICON_PLUS]: Plus,
  [ICON_X_MARK]: XMark,
  [ICON_TRASH]: Trash,
  [ICON_CLOCK]: Clock,
  [ICON_CHART_BAR]: ChartBar,
  [ICON_ARROW_PATH]: ArrowPath,
  [ICON_LIST_BULLET]: ListBullet,
  [ICON_CHECK_CIRCLE]: CheckCircle,
}
