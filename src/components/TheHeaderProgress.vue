<script setup lang="ts">
import { PAGE_PROGRESS } from '@/constants'
import { navigate } from '@/router'
import BaseIcon from './BaseIcon.vue'
import { ICON_CHECK_CIRCLE } from '@/icons'
</script>

<template>
  <a :href="`#${PAGE_PROGRESS}`" @click="navigate(PAGE_PROGRESS)">
    <div v-if="true" class="flex items-center gap-1">
      Day Completed

      <BaseIcon :name="ICON_CHECK_CIRCLE" class="h-7 text-green-500" />
    </div>
    <div v-else class="flex items-center gap-1">
      <div>Progress <span class="font-mono">20</span>%</div>
      <div class="w-6 h-6 bg-red-500 rounded-full"></div>
    </div>
  </a>
</template>
