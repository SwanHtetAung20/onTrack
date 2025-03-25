import { ref, type ComponentPublicInstance, computed } from 'vue'
import {
  HOURS_IN_DAY,
  type Activity,
  type TimeLineItem,
  MIDNIGHT_HOUR,
  type SaveData,
} from '@/constants'
import { now, toSeconds, today, isToday, endOfHour } from '@/time'

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
          timelineItem.hour === now.value.getHours() ? timelineItem.activitySeconds : 0,
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

export const scrollToHour = (hour: number) => {
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemsRef.value[hour - 1].$el
  el.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export const scrollToCurrentHour = () => {
  scrollToHour(now.value.getHours())
}

export const resetTimelineItems = (timelineItems: TimeLineItem[]) => {
  return timelineItems.map((timelineItem) => ({
    ...timelineItem,
    activitySeconds: 0,
    isActive: false,
  }))
}

const calculateIdleSeconds = (lastActiveAt: Date): number => {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today().getTime() - lastActiveAt.getTime())
    : toSeconds(endOfHour(lastActiveAt) - lastActiveAt.getTime())
}

const syncIdleSeconds = (timelineItems: TimeLineItem[], lastActiveAt: Date) => {
  const activeTimelineItem = timelineItems.find(({ isActive }) => isActive)

  if (activeTimelineItem) {
    activeTimelineItem.activitySeconds += calculateIdleSeconds(lastActiveAt)
  }
  return timelineItems
}

export const initializeTimelineItems = (state: SaveData) => {
  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? generateTimelineItems()
  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    timelineItems.value = syncIdleSeconds(state.timelineItems, lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    timelineItems.value = resetTimelineItems(state.timelineItems)
  }
}
