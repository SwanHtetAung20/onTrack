<script setup lang="ts">
import ActivityItems from '@/components/ActivityItems.vue'
import TheActivityForm from '@/components/TheActivityForm.vue'
import TheActivitiesEmptyStage from '@/components/TheActivitiesEmptyStage.vue'
import { activities } from '@/activity'
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length" class="divide-y grow">
      <ActivityItems v-for="activity in activities" :key="activity.id" :activity="activity" />
    </ul>
    <TheActivitiesEmptyStage v-else />
    <TheActivityForm />
  </div>
</template>
