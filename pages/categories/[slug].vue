
<template>
  <CardsBreadcrumbs :items="breadcrumbs" />
  <CardsBase>
    <h1>Categories</h1>
    <div v-if="categories">
      <div v-for="category in categories" :key="category.id">
        <NuxtLink :to="`/categories/${category.slug}`">{{ category.name }}</NuxtLink>
        <p>{{ category.description }}</p>
      </div>
    </div>
    <!-- display loading-->
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <!-- display error-->
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
  </CardsBase>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useCategoryStore } from '@/store/categories';
import { useRouter } from 'vue-router';

const breadcrumbs = [
  {
    label: 'Home',
    action: () => router.push({ name: 'index' }),
  },
  {
    label: 'Categories',
    action: () => router.push({ name: 'categories' }),
  },
  {
    label: 'Category Detail',
  },
];

const categoryStore = useCategoryStore();
const { category, loading, error } = storeToRefs(categoryStore);
const router = useRouter();

const { fetchCategory } = categoryStore;

onMounted(() => {
  fetchCategory(router.currentRoute.value.params.slug);
});


</script> 