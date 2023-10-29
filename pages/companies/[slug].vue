<template>
  <div class="container mx-auto py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">{{ company.name }}</h1>
      <div class="mt-4 flex items-center">
        <span class="text-sm font-medium text-gray-900">{{ company.industry }}</span>
        <span class="mx-2 text-gray-600">•</span>
        <span class="text-sm font-medium text-gray-900">{{ company.location }}</span>
      </div>
      <div class="mt-8 flex flex-col lg:flex-row">
        <div class="lg:w-3/4">
          <div class="prose max-w-none">
            <div v-html="company.description"></div>
          </div>
        </div>
        <div class="lg:ml-8">
          <div class="sticky top-4">
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Company Details
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  Details about the company.
                </p>
              </div>
              <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl class="sm:divide-y sm:divide-gray-200">
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">
                      Number of employees
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ company.numEmployees }}
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">
                      Year founded
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ company.yearFounded }}
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">
                      Website
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <a :href="company.website" target="_blank">{{ company.website }}</a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '~/store/companies'

const companyStore = useCompanyStore()

const { company } = storeToRefs(companyStore)

const fetchCompany = async () => {
  const { params } = useRoute()
  await companyStore.fetchCompany(params.slug)
}

onMounted(async () => {
  await fetchCompany()
})
</script>

<style>
/* Add styles for the company details page here */
</style>
