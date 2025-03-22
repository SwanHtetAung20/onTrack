<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import { validateSelectOptions } from '@/validator'
import { BUTTON_TYPE_NEUTRAL } from '@/constants'
import { ICON_X_MARK } from '@/icons'
defineProps({
  options: {
    type: Array as () => { value: number | string; label: string }[],
    default: () => [],
    validator: validateSelectOptions,
  },
  placeholder: {
    type: String,
    required: true,
  },
  selected: {
    type: [String, Number, null],
    default: undefined,
  },
})

const emit = defineEmits({
  select(value: string | null | number) {
    return typeof value === 'string' || typeof value === 'number' || value === null
  },
})
</script>

<template>
  <div class="flex gap-2">
    <BaseButton :type="BUTTON_TYPE_NEUTRAL" @click="emit('select', null)">
      <BaseIcon :name="ICON_X_MARK" />
    </BaseButton>
    <select
      class="w-full truncate rounded bg-gray-100 py-1 px-2 text-2xl"
      @change="emit('select', $event.target.value)"
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
