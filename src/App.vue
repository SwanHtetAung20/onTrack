<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import TheTimeLine from './pages/TheTimeLine.vue'
import { provide, readonly } from 'vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE, type Activity } from './constants'
import { generatePeriodSelection } from './functions'
import { timelineRef, currentPage } from './router'
import * as keys from './key'
import { activities, activitySelectOptions, deleteActivityItem, createActivity } from './activity'
import {
  updateTimelineItemActivitySeconds,
  setTimelineItemActivity,
  timelineItems,
  resetTimelineActivity,
} from './timeline-items'

const setSecondsToComplete = (activity: Activity, secondsToComplete: number): void => {
  activity.secondsToComplete = secondsToComplete || 0
}

provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)

provide(keys.timelineItemsKey, readonly(timelineItems))

provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions))

provide(keys.periodSelectionKey, readonly(generatePeriodSelection()))

provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)

provide(keys.setSecondsToCompleteKey, setSecondsToComplete)

provide(keys.createActivityKey, createActivity)

provide(keys.deleteActivityItemKey, (activity: Activity) => {
  deleteActivityItem(activity)
  resetTimelineActivity(activity)
})
</script>

<template>
  <TheHeader />
  <main class="flex grow flex-col">
    <TheTimeLine
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      ref="timelineRef"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <TheNav />
</template>
