<script setup lang="ts">
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/solid'
import BaseButton from './BaseButton.vue'
import { BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING, BUTTON_TYPE_DANGER } from '@/constants'
import { formatSecond } from '@/functions'

defineProps({
  second: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0,
  },
})
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER">
      <ArrowPathIcon class="h-8" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded font-mono text-3xl bg-gray-100 px-2">
      {{ formatSecond(second) }}
    </div>
    <BaseButton :type="BUTTON_TYPE_WARNING">
      <PlayIcon class="h-8" />
    </BaseButton>
    <BaseButton :type="BUTTON_TYPE_SUCCESS">
      <PauseIcon class="h-8" />
    </BaseButton>
  </div>
</template>
