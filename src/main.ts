import './assets/base.css'
import { loadState, saveState } from './storage'
import { createApp } from 'vue'
import App from './App.vue'
import { findActiveTimelineItem, startTimelineItemTimer } from './timeline-items'

loadState()

const activeTimelineItem = findActiveTimelineItem()

if (activeTimelineItem) {
  startTimelineItemTimer(activeTimelineItem)
}

document.addEventListener('visibilitychange', () => {
  return document.visibilityState === 'visible' ? loadState() : saveState()
})

createApp(App).mount('#app')
