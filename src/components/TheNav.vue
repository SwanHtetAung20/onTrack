<script setup lang="ts">
import { NAV_ITEMS } from '@/constants'
import NavItems from './NavItems.vue'
</script>

<template>
  <nav class="sticky bottom-0 bg-white z-10">
    <ul class="flex justify-around items-center border-t">
      <NavItems v-for="navItem in NAV_ITEMS" :key="navItem.page" :nav-item="navItem" />
    </ul>
  </nav>
</template>
