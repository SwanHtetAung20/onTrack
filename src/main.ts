import './assets/base.css'
import * as storage from './storage'
import { activities } from './activity'
import { timelineItems } from './timeline-items'
import { createApp } from 'vue'
import App from './App.vue'

const saveState = () => {
  storage.save({
    timelineItems: timelineItems.value,
    activities: activities.value,
  })
}

const loadState = () => {
  const state = storage.load()
  timelineItems.value = state.timelineItems
  activities.value = state.activities
}

loadState()

document.addEventListener('visibilitychange', () => {
  return document.visibilityState === 'visible' ? loadState() : saveState()
})

createApp(App).mount('#app')
