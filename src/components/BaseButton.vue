<script lang="ts">
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_NEUTRAL, BUTTON_TYPE_PRIMARY } from '@/constants'
const typeClasses = {
  [BUTTON_TYPE_DANGER]: 'bg-red-500 enabled:hover:bg-red-600 text-white',
  [BUTTON_TYPE_NEUTRAL]: 'bg-gray-100 enabled:hover:bg-gray-200',
  [BUTTON_TYPE_PRIMARY]: 'bg-purple-500 enabled:hover:bg-purple-600 text-white',
}
</script>

<script setup lang="ts">
import { isButtonTypeValid } from '@/validator'

defineProps({
  type: {
    type: String,
    default: BUTTON_TYPE_PRIMARY,
    validator: isButtonTypeValid,
  },
})
</script>

<template>
  <button
    :class="`${typeClasses[type]} rounded p-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`"
  >
    <slot></slot>
  </button>
</template>
