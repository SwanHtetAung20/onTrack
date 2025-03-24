import './assets/base.css'
import { loadState, saveState } from './storage'
import { createApp } from 'vue'
import App from './App.vue'

loadState()

document.addEventListener('visibilitychange', () => {
  return document.visibilityState === 'visible' ? loadState() : saveState()
})

createApp(App).mount('#app')
