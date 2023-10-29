<template>
  <CardsBreadcrumbs :items="breadcrumbs" />
  
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else-if="job">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 ">
      <CardsBase class="col-span-4">
        <div class="flex">
          <div class="w-1/6">
            <img src="https://via.placeholder.com/150" alt="logo" class="w-full object-cover pr-7" />
          </div>
          <div class="w-5/6">
            <div class="flex justify-between items-center">
              <div>
                <HeadingsH2 class="text-xl font-bold ">
                  <NuxtLink :to="`/jobs/${job.slug}`">{{ job.title }}</NuxtLink>
                </HeadingsH2>
                <div class="flex items-center">
                  <span class=" text-slate-500 flex items-center mx-2">
                    <RectangleGroupIcon class="h-5 w-5 mr-1" />
                    {{ job.get_category }}
                  </span>
                  <span class=" text-slate-500 flex items-center mx-2">
                    <MapPinIcon class="h-5 w-5 mr-1" />
                    {{ job.get_location }}
                  </span>
                </div>
              </div>
              <div class="mt-4 flex items-center">
                <CalendarIcon class="h-5 w-5 mr-2" />
                <div class=" text-slate-500">{{ job.timesince }} ago | </div> 
                <HeartIcon class="h-5 w-5 text-red-500 mx-4" />
                <ButtonsGreen class="flex items-center">
                  <DocumentArrowUpIcon class="h-5 w-5 mr-1" />
                  Apply for Job
                </ButtonsGreen>
              </div>
            </div>
            <div class="mt-4 flex items-center">
              <span class=" text-slate-500 flex items-center mx-2">
                <EyeIcon class="h-5 w-5 mr-1" />
                {{ job.view_count }}
              </span>
              <span class=" text-slate-500 flex items-center mx-2">
                <CursorArrowRippleIcon class="h-5 w-5 mr-1" />
                {{ job.click_count }}
              </span>
              <span class=" text-slate-500 flex items-center mx-2">
                <DocumentCheckIcon class="h-5 w-5 mr-1" />
                {{ job.apply_count }}
              </span>
            </div>
            <div class="mt-4 flex items-center">
              <span class="text-xs bg-green-500 text-white py-1 px-2 rounded-full mr-2">{{ job.job_type }}</span>
              <span class="text-xs bg-yellow-500 text-white py-1 px-2 rounded-full" v-if="job.featured">Featured</span>
            </div>
            <hr class="my-4 border-t-2 border-gray-300">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <CurrencyDollarIcon class="h-5 w-5 mr-1" />
                {{ job.salary }} / {{ job.salary_type }}
              </div>
              <div class=" text-slate-500">{{ job.timesince }} ago </div>
            </div>
          </div>
        </div>
      </CardsBase>
      <CardsBase class="col-span-5 md:col-span-3 bg-white p-7 flex flex-col justify-start">
        <CardsDescription>
          <template #title>
            Job Description
          </template>
          <template #content>
            <p>
              {{ job.description }}
            </p>
          </template>
        </CardsDescription>
        <CardsDescription>
          <template #title>
            Job Qualification
          </template>
          <template #content>
            <p>
              {{ job.requirements }}
            </p>
            <!-- Add more qualification details as needed -->
          </template>
        </CardsDescription>
        <CardsDescription>
          <template #title>Required Skills</template>
          <template #content>
            <div class="flex space-x-4">
              <ButtonsGreen />
              <ButtonsBlue />
              <ButtonsRed />
              <ButtonsOrange />
            </div>
          </template>
        </CardsDescription>
      </CardsBase>
      <CardsBase class="col-span-1 md:col-span-1 flex flex-col">
        <HeadingsH2 class="mb-4">
          Information
        </HeadingsH2>
        <div class="flex items-start mb-8">
          <div class="w-5 h-5 text-indigo-900">
            <CalendarIcon />
          </div>
          <div class="ml-4">
            <div class=" text-indigo-900">Date Posted</div>
            <div class=" text-indigo-300">{{ job.timesince }} ago</div>
          </div>
        </div>
        <div class="flex items-start mb-8">
          <div class="w-5 h-5 text-indigo-900">
            <ClockIcon />
          </div>
          <div class="ml-4">
            <div class=" text-indigo-900">Work Hours</div>
            <div class=" text-indigo-300">{{ job.work_hours }}</div>
          </div>
        </div>
        <div class="flex items-start mb-8">
          <div class="w-5 h-5 text-indigo-900">
            <BriefcaseIcon />
          </div>
          <div class="ml-4">
            <div class=" text-indigo-900">Job Type</div>
            <div class=" text-indigo-300">{{ job.job_type }}</div>
          </div>
        </div>
        <div class="flex items-start mb-8">
          <div class="w-5 h-5 text-indigo-900">
            <MapIcon />
          </div>
          <div class="ml-4">
            <div class=" text-indigo-900">Location</div>
            <div class=" text-indigo-300">{{ job.get_location }}</div>
          </div>
        </div>
        <div class="flex items-start mb-8">
          <div class="w-5 h-5 text-indigo-900">
            <CurrencyDollarIcon />
          </div>
          <div class="ml-4">
            <div class=" text-indigo-900">Salary</div>
            <div class=" text-indigo-300">{{ job.salary }} / {{ job.salary_type }}</div>
          </div>
        </div>
        <div class="flex items-start mb-8">
          <div class="w-5 h-5 text-indigo-900">
            <MapPinIcon />
          </div>
          <div class="ml-4">
            <div class=" text-indigo-900">Category</div>
            <div class=" text-indigo-300">{{ job.get_category }}</div>
          </div>
        </div>
        <ButtonsGreen class="mt-4 flex items-center">
          <DocumentCheckIcon class="h-5 w-5 mr-1" />
          Apply for Job
        </ButtonsGreen>
      </CardsBase>
    </div>
  </div>
  <div v-else>
    <p>Job not found</p>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useJobStore } from '~/store/jobs'
import {
  CalendarIcon,
  BriefcaseIcon,
  MapIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  DocumentArrowUpIcon,
  RectangleGroupIcon,
  MapPinIcon,
  EyeIcon,
  CursorArrowRippleIcon,
  HeartIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const jobStore = useJobStore()
const { job, loading, error } = storeToRefs(jobStore)
const { fetchJob } = jobStore

const breadcrumbs = [
  {
    label: 'Home',
    action: () => router.push({ name: 'index' }),
  },
  {
    label: 'Jobs',
    action: () => router.push({ name: 'jobs' }),
  },
  {
    label: 'Job Description',
  },
];

onMounted(async () => {
  await fetchJob(route.params.slug)
})

</script>
