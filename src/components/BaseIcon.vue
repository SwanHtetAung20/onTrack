<script setup lang="ts">
import { isIconValid } from '@/validator'
import { ICONS } from '../icons'

defineProps({
  name: {
    type: String,
    required: true,
    validator: isIconValid,
  },
  className: {
    type: String,
    default: 'h-8',
    validator: (value: string) => value.trim() !== '',
  },
})
</script>

<template>
  <component :is="ICONS[name]" :class="className" />
</template>
