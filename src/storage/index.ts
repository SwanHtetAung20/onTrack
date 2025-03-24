import { APP_NAME, type SaveData } from '@/constants'

export const save = (data: SaveData) => {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      ...data,
      date: new Date().toDateString(),
    }),
  )
}

export const load = () => {
  const state = localStorage.getItem(APP_NAME)
  return state ? JSON.parse(state) : {}
}
