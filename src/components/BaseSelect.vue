<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid'
import BaseButton from './BaseButton.vue'
import { validateSelectOptions } from '@/validator'
defineProps({
  options: {
    type: Array as () => { value: number; label: string }[],
    default: () => [],
    validator: validateSelectOptions,
  },
  placeholder: {
    type: String,
    required: true,
  },
  selected: {
    type: Number,
    default: undefined,
  },
})

const emit = defineEmits({
  select(value: number) {
    return typeof value === 'number'
  },
})
</script>

<template>
  <div class="flex gap-2">
    <BaseButton @click="emit('select', 0)">
      <XMarkIcon class="h-8" />
    </BaseButton>
    <select
      class="w-full truncate rounded bg-gray-100 py-1 px-2 text-2xl"
      @change="emit('select', +$event.target.value)"
    >
      <option :selected="selected === undefined || selected === null" disabled value="">
        {{ placeholder }}
      </option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="value === selected"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>
