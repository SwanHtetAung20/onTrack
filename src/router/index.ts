import { ref } from 'vue'
import { PAGE_TIMELINE } from '@/constants'
import { isPageValid } from '@/validator'
import { currentHour } from '@/functions'

export const normalizePageHash = (): string => {
  const page = window.location.hash.slice(1)
  if (isPageValid(page)) {
    return page
  }
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}

export const currentPage = ref<string>(normalizePageHash())

export const timelineRef = ref()

export const navigate = (page: string): void => {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timelineRef.value?.scrollToHour(currentHour())
  } else if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView({
      behavior: 'auto',
      block: 'start',
    })
  }

  currentPage.value = page
}
