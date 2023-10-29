<template>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else-if="categories">
    <CardsBase>
      <HeadingsH2>Categories</HeadingsH2>
      <div v-for="category in categories" :key="category.id" class="flex items-center">
        <input type="checkbox" class="mr-2" />
        <NuxtLink :to="`/categories/${category.slug}`" class=" flex-grow text-blue-500 hover:underline">{{ category.name }}
        </NuxtLink>
        <span class="text-sm text-gray-500">({{ category.job_count }})</span>
      </div>
    </CardsBase>
  </div>
  <div v-else>
    what is this?
  </div>
</template>

<script setup>
const { categories } = defineProps({
  categories: {
    type: Array,
    required: true
  }
})

</script>  