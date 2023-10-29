<template>
  <CardsBase v-for="job in jobs" :key="job.slug">
    <div class="flex">
      <div class="w-1/6">
        <img src="https://via.placeholder.com/150" alt="logo" class="w-full object-cover pr-7" />
      </div>
      <div class="w-5/6">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-bold ">
              <NuxtLink :to="`/jobs/${job.slug}`">{{ job.title }}</NuxtLink>
            </h2>
            <div class="flex items-center">
              <span class="text-sm text-slate-500 flex items-center mx-2">
                <RectangleGroupIcon class="h-5 w-5 mr-1" />
                {{ job.get_category }}
              </span>
              <span class="text-sm text-slate-500 flex items-center mx-2">
                <MapPinIcon class="h-5 w-5 mr-1" />
                {{ job.get_location }}
              </span>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <div class="flex items-center mr-4">
              <CalendarIcon class="h-5 w-5 mr-1" />
              <div class="text-sm text-slate-500">{{ job.timesince }} ago </div>
            </div>
            <HeartIcon class="h-5 w-5 text-red-500 mr-2" />
            <ButtonsGreen class="flex items-center">
              <DocumentArrowUpIcon class="h-5 w-5 mr-1" />
              Apply for Job
            </ButtonsGreen>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-justify text-slate-500 dark:text-slate-100 truncate hover:text-clip">{{ job.description }}</p>
        </div>
        <div class="mt-4 flex items-center">
          <span class="text-sm text-slate-500 flex items-center mx-2">
            <EyeIcon class="h-5 w-5 mr-1" />
            {{ job.view_count }}
          </span>
          <span class="text-sm text-slate-500 flex items-center mx-2">
            <CursorArrowRippleIcon class="h-5 w-5 mr-1" />
            {{ job.click_count }}
          </span>
          <span class="text-sm text-slate-500 flex items-center mx-2">
            <DocumentCheckIcon class="h-5 w-5 mr-1" />
            {{ job.apply_count }}
          </span>
        </div>
        <div class="mt-4 flex items-center">
          <span class="text-xs bg-green-500 text-white py-1 px-2 rounded-full mr-2">{{ job.get_job_type }}</span>
          <span class="text-xs bg-yellow-500 text-white py-1 px-2 rounded-full" v-if="job.featured">Featured</span>
        </div>
        <hr class="my-4 border-t-2 border-gray-300">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <CurrencyDollarIcon class="h-5 w-5 mr-1" />
            {{ job.salary }}/ {{ job.salary_type }}
          </div>
          <div class="text-sm text-slate-500">{{ job.days_left }} days left</div>
        </div>
      </div>
    </div>
  </CardsBase>
</template>

<script setup>
import { DocumentArrowUpIcon, DocumentCheckIcon, RectangleGroupIcon, MapPinIcon, EyeIcon, CursorArrowRippleIcon, HeartIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'

const { jobs } = defineProps({
  jobs: {
    type: Array,
    required: true
  }
})
</script>
