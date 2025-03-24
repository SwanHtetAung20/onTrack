import './assets/base.css'
import { loadState, saveState } from './storage'
import { createApp } from 'vue'
import App from './App.vue'
import { activeTimelineItem } from './timeline-items'
import { startTimelineItemTimer } from './timeline-items/timeline-item-timer'

loadState()

if (activeTimelineItem.value) {
  startTimelineItemTimer(activeTimelineItem.value)
}

document.addEventListener('visibilitychange', () => {
  return document.visibilityState === 'visible' ? loadState() : saveState()
})

createApp(App).mount('#app')
