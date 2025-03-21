import { ref } from 'vue'
import { activities } from '@/activity'
import { HOURS_IN_DAY, type Activity, type TimeLineItem } from '@/constants'

const generateTimelineItems = (): TimeLineItem[] => {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: [0, 1, 2, 3, 4].includes(hour) ? activities.value[hour % 3].id : null,
    activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
    // activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
    // activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR,
  }))
}

export const timelineItems = ref<TimeLineItem[]>(generateTimelineItems())

export const updateTimelineItem = (
  timelineItem: TimeLineItem,
  fields: Partial<TimeLineItem>,
): void => {
  Object.assign(timelineItem, fields)
}

const hasActivity = (timelineItem: TimeLineItem, activity: Activity): boolean => {
  return timelineItem.activityId === activity.id
}
export const resetTimelineActivity = (activity: Activity): void => {
  timelineItems.value
    .filter((item: TimeLineItem) => hasActivity(item, activity))
    .forEach((timelineItem: TimeLineItem) =>
      updateTimelineItem(timelineItem, {
        activityId: null,
        activitySeconds: 0,
      }),
    )
}

export const getTotalActivitySeconds = (activity: Activity): number => {
  return timelineItems.value
    .filter((item) => hasActivity(item, activity))
    .reduce((totalSeconds, item) => Math.round(item.activitySeconds + totalSeconds), 0)
}
