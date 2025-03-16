<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import TheTimeLine from './pages/TheTimeLine.vue'
import { ref } from 'vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE, type TimeLineItem } from './constants'
import { normalizePageHash, generateTimelineItems } from './functions'

const currentPage = ref<string>(normalizePageHash())

const timelineItems: TimeLineItem[] = generateTimelineItems()

const activities = ['Reading', 'Coding', 'Exercising']

const goTo = (page: string): void => {
  currentPage.value = page
}
</script>

<template>
  <TheHeader @navigate="goTo($event)" />
  <main class="flex grow flex-col">
    <TheTimeLine v-show="currentPage === PAGE_TIMELINE" :timeline-items="timelineItems" />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
