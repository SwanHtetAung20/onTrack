<script setup lang="ts"></script>

<template>
  <button
    class="rounded p-3 bg-gray-100 enabled:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <slot></slot>
  </button>
</template>
