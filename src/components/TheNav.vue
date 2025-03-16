<script setup lang="ts">
import { NAV_ITEMS } from '@/constants'
import NavItems from './NavItems.vue'
import { isPageValid } from '@/validator'

defineProps({
  currentPage: {
    type: String,
    required: true,
    validator: isPageValid,
  },
})

const emit = defineEmits(['navigate'])
</script>

<template>
  <nav class="sticky bottom-0 bg-white z-10">
    <ul class="flex justify-around items-center border-t">
      <NavItems
        v-for="(icon, page) in NAV_ITEMS"
        :key="page"
        :href="`#${page}`"
        :class="{ 'bg-gray-300 pointer-events-none': page === currentPage }"
        @click="emit('navigate', page)"
      >
        <component :is="icon" class="h-6 w-6" />
        {{ page }}
      </NavItems>
    </ul>
  </nav>
</template>
