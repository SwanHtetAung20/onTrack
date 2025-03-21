import { ref } from 'vue'
import { PAGE_TIMELINE } from '@/constants'
import { isPageValid } from '@/validator'

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
