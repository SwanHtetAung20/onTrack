<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import { currentPage, routes } from './router'
</script>

<template>
  <TheHeader />
  <main class="flex grow flex-col">
    <KeepAlive>
      <component :is="routes[currentPage]" />
    </KeepAlive>
  </main>
  <TheNav />
</template>
