<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import { BUTTON_TYPE_PRIMARY } from '@/constants'
import { ref, nextTick } from 'vue'
import { createActivity } from '@/activity'
import { ICON_PLUS } from '@/icons'

const activity = ref<string>('')

const submit = async () => {
  if (createActivity) createActivity(activity.value)
  activity.value = ''
  await nextTick()

  window.scrollTo(0, document.body.scrollHeight)
}
</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      type="text"
      v-model="activity"
      class="w-full rounded px-4 border text-xl placeholder:bg-slate-100"
      placeholder="Activity name"
    />
    <BaseButton :type="BUTTON_TYPE_PRIMARY" :disabled="activity.trim() === ''">
      <BaseIcon :name="ICON_PLUS" />
    </BaseButton>
  </form>
</template>
