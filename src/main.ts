import './assets/base.css'
import { createApp } from 'vue'
import App from './App.vue'
import { syncState } from './storage'

syncState()

document.addEventListener('visibilitychange', () => {
  return syncState(document.visibilityState === 'visible')
})

createApp(App).mount('#app')
