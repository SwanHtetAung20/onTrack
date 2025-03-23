<script setup lang="ts">
import { HUNDRED_PERCENTAGE, PAGE_PROGRESS } from '@/constants'
import { navigate } from '@/router'
import BaseIcon from './BaseIcon.vue'
import { ICON_CHECK_CIRCLE } from '@/icons'
import { useTotalProgress } from '@/composables/total-progress'

const { percentage, colorClass } = useTotalProgress()
</script>

<template>
  <a :href="`#${PAGE_PROGRESS}`" @click="navigate(PAGE_PROGRESS)">
    <div v-if="percentage < HUNDRED_PERCENTAGE" class="flex items-center gap-1">
      <div>
        Progress <span class="font-mono">{{ percentage }}</span
        >%
      </div>
      <div :class="`w-6 h-6 rounded-full ${colorClass}`"></div>
    </div>
    <div v-else class="flex items-center gap-1">
      Day Completed

      <BaseIcon :name="ICON_CHECK_CIRCLE" class="h-7 text-green-500" />
    </div>
  </a>
</template>
