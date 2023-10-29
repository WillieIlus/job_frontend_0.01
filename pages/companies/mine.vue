<template>
  <div>
    <h1>Companies</h1>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="companies">
      <ul>
        <li v-for="company in companies" :key="company.id">
          <NuxtLink :to="`/companies/${company.slug}`">{{ company.name }}</NuxtLink>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>{{ error }}</p>
      <p> company not found {{ company }}</p>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '~/store/companies'

const companyStore = useCompanyStore()
const { companies, loading, error } = storeToRefs(companyStore)
const { fetchMyCompanies } = companyStore

onMounted(async () => {
  await fetchMyCompanies()
})

</script>