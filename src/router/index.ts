import { ref } from 'vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'
import { isPageValid } from '@/validator'
import TheTimeLine from '@/pages/TheTimeLine.vue'
import TheActivities from '@/pages/TheActivities.vue'
import TheProgress from '@/pages/TheProgress.vue'

export const normalizePageHash = (): string => {
  const page = window.location.hash.slice(1)
  if (isPageValid(page)) {
    return page
  }
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}

export const currentPage = ref<string>(normalizePageHash())

export const navigate = (page: string): void => {
  document.body.scrollIntoView()
  currentPage.value = page
}

export const routes: Record<string, any> = {
  [PAGE_TIMELINE]: TheTimeLine,
  [PAGE_ACTIVITIES]: TheActivities,
  [PAGE_PROGRESS]: TheProgress,
}
