<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid'
import BaseButton from './BaseButton.vue'
defineProps<{
  options: {
    type: Array<{ value: string; label: string }>
    default: () => []
  }
  placeholder: {
    type: string
    required: true
  }
  selected: {
    type: string
    default: ''
  }
}>()
</script>

<template>
  <div class="flex gap-2">
    <BaseButton>
      <XMarkIcon class="h-8" />
    </BaseButton>
    <select name="" id="" class="w-full truncate rounded bg-gray-100 py-1 px-2 text-2xl">
      <option selected disabled value="">Reset</option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="selected === value"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>
