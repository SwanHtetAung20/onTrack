<script setup lang="ts">
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/solid'
import NavItems from './NavItems.vue'

const navItem = {
  timeline: ClockIcon,
  activities: ListBulletIcon,
  progress: ChartBarIcon,
}
</script>

<template>
  <nav class="sticky bottom-0 bg-white z-10">
    <ul class="flex justify-around items-center border-t">
      <NavItems v-for="(icon, page) in navItem" :key="page" :href="`#${page}`">
        <component :is="icon" class="h-6 w-6" /> {{ page }}
      </NavItems>
    </ul>
  </nav>
</template>
