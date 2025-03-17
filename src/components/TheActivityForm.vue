<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { BUTTON_TYPE_PRIMARY } from '@/constants'
import { ref, nextTick } from 'vue'
import { isActivityItemValid } from '@/validator'

const activity = ref<string>('')

const emit = defineEmits({
  submit(activity: string) {
    return typeof activity === 'string'
  },
})

const submit = async () => {
  emit('submit', activity.value)
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
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>
