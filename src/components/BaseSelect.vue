<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid'
import BaseButton from './BaseButton.vue'
defineProps({
  options: {
    type: Array as () => { value: number; label: string }[],
    default: () => [],
    validator: (options: { value: number; label: string }[]) =>
      options.every((opt) => typeof opt.value === 'number' && typeof opt.label === 'string'),
  },
  placeholder: {
    type: String,
    required: true,
  },
  selected: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div class="flex gap-2">
    <BaseButton>
      <XMarkIcon class="h-8" />
    </BaseButton>
    <select name="" id="" class="w-full truncate rounded bg-gray-100 py-1 px-2 text-2xl">
      <option selected disabled value="">{{ placeholder }}</option>
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
