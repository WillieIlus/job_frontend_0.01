<template>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else-if="locations">
    <CardsBase>
      <HeadingsH2>Locations</HeadingsH2>
      <div v-for="location in locations" :key="location.id" class="flex items-center">
        <input type="checkbox" class="mr-2" />
        <NuxtLink :to="`/locations/${location.slug}`" class=" flex-grow text-blue-500 hover:underline">{{ location.name }}
        </NuxtLink>
        <span class="text-sm text-gray-500">({{ location.job_count }})</span>
      </div>

    </CardsBase>
  </div>
  <div v-else>
    what is this?
  </div>
  </template>

  <script setup>
  const { locations } = defineProps({
    locations: {
      type: Array,
      required: true
    }
  })

  </script>
  