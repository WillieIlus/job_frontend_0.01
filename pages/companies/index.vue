<template>
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">Featured Companies</h2>
      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        <div v-for="company in companies" :key="company.id">
          <CardsBase :company="company">
            <div class="mt-6 flex justify-between">
              <div class="flex space-x-3">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ company.status }}
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {{ company.type }}
                </span>
              </div>
              <div class="text-sm font-medium text-gray-900">
                <a :href="company.href" class="hover:underline">View</a>
              </div>
            </div>
          </CardsBase>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '~/store/companies'

const companyStore = useCompanyStore()

const { companies, loading } = storeToRefs(companyStore)

const fetchCompanies = async () => {
  await companyStore.fetchCompanies()
}

onMounted(async () => {
  await fetchCompanies()
})

</script>