<template>
  <div class="flex flex-col">
    <div>
      <ButtonsBlue>
        <NuxtLink to="/jobs/create">Create Job</NuxtLink>
      </ButtonsBlue>
    </div>
    <div class="flex mb-4 mt-16">
      <FormsSearch />
    </div>
    <div class="flex">
      <div class="w-1/4 px-10">
        Filter List
      </div>
      <div class="w-3/4 px-10">
        Showing 01-12 of 96 jobs
      </div>
    </div>
    <div class="flex gap-2">
      <div class="w-1/4">
        <FilterCategories :categories="categories" />
        <FilterLocations :locations="locations" />
      </div>
      <div class="w-3/4">
        <div v-if="loading">
          <p>Loading...</p>
        </div>
        <ul v-else-if="jobs">
          <JobList :jobs="jobs" />
        </ul>
        <ul v-else>
          what is this?
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useJobStore } from '~/store/jobs';
import { useCategoryStore } from '~/store/categories';
import { useLocationStore } from '~/store/locations';

const jobStore = useJobStore()
const categoryStore = useCategoryStore()
const locationStore = useLocationStore()

const { jobs, loading } = storeToRefs(jobStore)
const { categories } = storeToRefs(categoryStore)
const { locations } = storeToRefs(locationStore)

const fetchJobs = async () => {
  await jobStore.fetchJobs()
}

const fetchCategories = async () => {
  await categoryStore.fetchCategories()
}

const fetchLocations = async () => {
  await locationStore.fetchLocations()
}

// const categories = ref([
//   {
//     id: 1,
//     name: 'Art & Design',
//     slug: 'art-design',
//     job_count: 10
//     // view_count: 100,
//   },
//   {
//     id: 2,
//     name: 'Education',
//     slug: 'education',
//     job_count: 20
//   },
//   {
//     id: 3,
//     name: 'Engineering',
//     slug: 'engineering',
//     job_count: 30
//   },
//   {
//     id: 4,
//     name: 'Healthcare',
//     slug: 'healthcare',
//     job_count: 40
//   },
//   {
//     id: 5,
//     name: 'Information Technology',
//     slug: 'information-technology',
//     job_count: 50
//   },
//   {
//     id: 6,
//     name: 'Marketing',
//     slug: 'marketing',
//     job_count: 60
//   },
//   {
//     id: 7,
//     name: 'Sales',
//     slug: 'sales',
//     job_count: 70
//   },
//   {
//     id: 8,
//     name: 'Science',
//     slug: 'science',
//     job_count: 80
//   },
//   {
//     id: 9,
//     name: 'Transportation',
//     slug: 'transportation',
//     job_count: 90
//   },
//   {
//     id: 10,
//     name: 'Writing',
//     slug: 'writing',
//     job_count: 100
//   }

// ])

// const locations = ref([
//   {
//     id: 1,
//     name: 'New York',
//     slug: 'new-york',
//     job_count: 10
//   },
//   {
//     id: 2,
//     name: 'Los Angeles',
//     slug: 'los-angeles',
//     job_count: 20
//   },
//   {
//     id: 3,
//     name: 'Chicago',
//     slug: 'chicago',
//     job_count: 30
//   },
//   {
//     id: 4,
//     name: 'Houston',
//     slug: 'houston',
//     job_count: 40
//   },
//   {
//     id: 5,
//     name: 'Phoenix',
//     slug: 'phoenix',
//     job_count: 50
//   },
//   {
//     id: 6,
//     name: 'Philadelphia',
//     slug: 'philadelphia',
//     job_count: 60
//   },
//   {
//     id: 7,
//     name: 'San Antonio',
//     slug: 'san-antonio',
//     job_count: 70
//   },
//   {
//     id: 8,
//     name: 'San Diego',
//     slug: 'san-diego',
//     job_count: 80
//   },
//   {
//     id: 9,
//     name: 'Dallas',
//     slug: 'dallas',
//     job_count: 90
//   },
//   {
//     id: 10,
//     name: 'San Jose',
//     slug: 'san-jose',
//     job_count: 100
//   }

// ])

onMounted(async () => {
  await fetchJobs()
  await fetchCategories()
  await fetchLocations()
})


</script>  