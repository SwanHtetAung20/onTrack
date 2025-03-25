import './assets/base.css'
import { createApp } from 'vue'
import App from './App.vue'
import { syncState } from './storage'
import { startCurrentDateTimer } from './time'

syncState()

startCurrentDateTimer()

document.addEventListener('visibilitychange', () => {
  return syncState(document.visibilityState === 'visible')
})

createApp(App).mount('#app')
