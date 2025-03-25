import { ref, type ComponentPublicInstance, computed, watch } from 'vue'
import {
  HOURS_IN_DAY,
  type Activity,
  type TimeLineItem,
  MIDNIGHT_HOUR,
  type SaveData,
} from '@/constants'
import { toSeconds, today, isToday, endOfHour, now } from '@/time'
import { stopTimelineItemTimer } from './timeline-item-timer'

const generateTimelineItems = (): TimeLineItem[] => {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null,
    activitySeconds: 0,
    isActive: false,
  }))
}

export const timelineItems = ref<TimeLineItem[]>([])
export const timelineItemsRef = ref<ComponentPublicInstance[]>([])

export const activeTimelineItem = computed(() =>
  timelineItems.value.find(({ isActive }) => isActive),
)

export const updateTimelineItem = (
  timelineItem: TimeLineItem,
  fields: Partial<TimeLineItem>,
): void => {
  Object.assign(timelineItem, fields)
}

const hasActivity = (timelineItem: TimeLineItem, activity: Activity): boolean => {
  return timelineItem.activityId === activity.id
}
export const resetTimelineActivity = (timelineItems: TimeLineItem[], activity: Activity): void => {
  timelineItems
    .filter((item: TimeLineItem) => hasActivity(item, activity))
    .forEach((timelineItem: TimeLineItem) =>
      updateTimelineItem(timelineItem, {
        activityId: null,
        activitySeconds:
          timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0,
      }),
    )
}

export const calculateTrackedActivitySeconds = (
  timelineItems: TimeLineItem[],
  activity: Activity,
): number => {
  return timelineItems
    .filter((item) => hasActivity(item, activity))
    .reduce((totalSeconds, item) => Math.round(item.activitySeconds + totalSeconds), 0)
}

export const scrollToHour = (hour: number, isSmooth: boolean = false) => {
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemsRef.value[hour - 1].$el
  el.scrollIntoView({
    behavior: isSmooth ? 'smooth' : 'auto',
    block: 'start',
  })
}

export const scrollToCurrentHour = (isSmooth: boolean = false) => {
  scrollToHour(today().getHours(), isSmooth)
}

const resetTimelineItems = () => {
  return timelineItems.value.forEach((timelineItem) =>
    updateTimelineItem(timelineItem, {
      activitySeconds: 0,
      isActive: false,
    }),
  )
}

watch(now, (after, before) => {
  if (activeTimelineItem.value && activeTimelineItem.value.hour !== after.getHours()) {
    stopTimelineItemTimer()
  }

  if (before.getHours() !== after.getHours() && after.getHours() === MIDNIGHT_HOUR) {
    resetTimelineItems()
  }
})

const calculateIdleSeconds = (lastActiveAt: Date): number => {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today().getTime() - lastActiveAt.getTime())
    : toSeconds(endOfHour(lastActiveAt) - lastActiveAt.getTime())
}

const syncIdleSeconds = (lastActiveAt: Date) => {
  updateTimelineItem(activeTimelineItem.value!, {
    activitySeconds: activeTimelineItem.value!.activitySeconds + calculateIdleSeconds(lastActiveAt),
  })
}

export const initializeTimelineItems = (state: SaveData) => {
  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? generateTimelineItems()
  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    syncIdleSeconds(lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    resetTimelineItems()
  }
}
