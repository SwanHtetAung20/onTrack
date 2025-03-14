<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <a href="#">
    <div v-if="true" class="flex items-center gap-1">
      Day Completed

      <CheckCircleIcon class="h-7 text-green-500" />
    </div>
    <div v-else class="flex items-center gap-1">
      <div>Progress <span class="font-mono">20</span>%</div>
      <div class="w-6 h-6 bg-red-500 rounded-full"></div>
    </div>
  </a>
</template>
