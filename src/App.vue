<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import TheTimeLine from './pages/TheTimeLine.vue'
import { ref } from 'vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE, type TimeLineItem } from './constants'
import {
  normalizePageHash,
  generateTimelineItems,
  generateActivitySelectOptions,
} from './functions'

const currentPage = ref<string>(normalizePageHash())

const timelineItems: TimeLineItem[] = generateTimelineItems()

const activities = ref(['Reading', 'Coding', 'Exercising'])

const activitySelectOptions = ref(generateActivitySelectOptions(activities.value))

const goTo = (page: string): void => {
  currentPage.value = page
}

const deleteActivityItem = (activity: string): void => {
  const index = activities.value.indexOf(activity)
  if (index !== -1) {
    activities.value.splice(index, 1)
  }
}

const createActivity = (activity: string): void => {
  activities.value.push(activity)
  activitySelectOptions.value.push({ value: activitySelectOptions.value.length, label: activity })
}
</script>

<template>
  <TheHeader @navigate="goTo($event)" />
  <main class="flex grow flex-col">
    <TheTimeLine
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
    />
    <TheActivities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @delete-activity="deleteActivityItem"
      @create-activity="createActivity"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
