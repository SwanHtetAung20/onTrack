<script setup lang="ts">
import { isIconValid } from '@/validator'
import { ICONS } from '../icons'

defineProps({
  name: {
    type: String,
    required: true,
    validator: isIconValid,
  },
})
</script>

<template>
  <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>
