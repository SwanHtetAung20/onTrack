<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import TheTimeLine from './pages/TheTimeLine.vue'
import { ref, computed, provide } from 'vue'
import {
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
  PAGE_TIMELINE,
  type Activity,
  type TimeLineItem,
} from './constants'
import {
  normalizePageHash,
  generateTimelineItems,
  generateActivitySelectOptions,
  generateActivities,
  id,
  generatePeriodSelection,
} from './functions'

const currentPage = ref<string>(normalizePageHash())

const activities = ref(generateActivities())

const timelineItems = ref<TimeLineItem[]>(generateTimelineItems(activities.value))

const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

const timeline = ref()

const goTo = (page: string): void => {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timeline.value?.scrollToHour(new Date().getHours())
  }

  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView({
      behavior: 'auto',
      block: 'start',
    })
  }

  currentPage.value = page
}

const deleteActivityItem = (deleteActivity: Activity): void => {
  timelineItems.value.forEach((timelineItem: TimeLineItem) => {
    if (timelineItem.activityId === deleteActivity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })

  const index = activities.value.findIndex((activity) => activity.id === deleteActivity.id)
  if (index !== -1) {
    activities.value.splice(index, 1)
  }
}

const createActivity = (name: string): void => {
  activities.value.push({
    id: id(),
    name,
    secondsToComplete: 0,
  })
}

const setTimelineItemActivity = (timelineItem: TimeLineItem, activityId: string | null): void => {
  timelineItem.activityId = activityId
}

const setSecondsToComplete = (activity: Activity, secondsToComplete: number): void => {
  activity.secondsToComplete = secondsToComplete || 0
}

const updateTimelineItemActivitySeconds = (timelineItem: TimeLineItem, seconds: number): void => {
  timelineItem.activitySeconds += seconds
}

provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)

provide('timelineItems', timelineItems.value)

provide('activitySelectOptions', activitySelectOptions.value)

provide('periodSelection', generatePeriodSelection())

provide('setTimelineItemActivity', setTimelineItemActivity)

provide('setSecondsToComplete', setSecondsToComplete)

provide('createActivity', createActivity)

provide('deleteActivityItem', deleteActivityItem)
</script>

<template>
  <TheHeader @navigate="goTo($event)" />
  <main class="flex grow flex-col">
    <TheTimeLine
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :current-page="currentPage"
      ref="timeline"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
