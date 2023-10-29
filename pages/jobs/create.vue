<template>
  <CardsBreadcrumbs :items="breadcrumbs" />
  <CardsBase>
    <h1 class="font-bold text-lg p-3 pl-0">Add Job</h1>
    <form @submit.prevent="onHandleSubmit">
      <FormsInput v-model="title" label="Title" type="text" @blur="useValidateField('title')" />
      <p v-if="errors.title" class="text-red-500">{{ errors.title }}</p>
      <div v-if="companies" class="mb-4 flex items-center">
        <label for="company" class="block text-gray-700 text-sm font-bold mb-2 mr-2 w-32">Company</label>
        <select v-model="company" id="company"
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 text-indigo-800">
          <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}</option>
        </select>
        <p v-if="errors.company" class="text-red-500">{{ errors.company }}</p>
      </div>
      <div>
        <label for="job_type" class="block text-gray-700 text-sm font-bold mb-2 mr-2 w-32">Job Type</label>
        <select v-model="job_type" id="job_type"
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 text-indigo-800">
          <option v-for="jobType in jobTypes" :key="jobType.value" :value="jobType.value">{{ jobType.label }}</option>
        </select>
      </div>
      <ButtonsGreen :disabled="submitting" :class="{ 'opacity-50': submitting }" type="submit">
        <span v-if="submitting">Adding...</span>
        <span v-else>Add Job</span>
      </ButtonsGreen>
    </form>
    <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p> <!-- Show success message -->
  </CardsBase>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useJobStore } from '@/store/jobs';
import { useCompanyStore } from '~/store/companies';
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

const breadcrumbs = [
  {
    label: 'Home',
    action: () => router.push({ name: 'index' }),
  },
  {
    label: 'Jobs',
  },
];

const jobTypes = computed(() => {
  return [
    { value: 'Full Time', label: 'Full Time' },
    { value: 'Part Time', label: 'Part Time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Temporary', label: 'Temporary' },
    { value: 'Freelance', label: 'Freelance' },
  ];
});

const jobStore = useJobStore();
const companyStore = useCompanyStore();
const { job, jobs, loading, error } = storeToRefs(jobStore);
const { companies } = storeToRefs(companyStore);
const router = useRouter();

const schema = yup.object({
  title: yup.string().min(3).required(),
  company: yup.string(),
  job_type: yup.string(),
});

const { handleSubmit, validateField } = useForm({ validationSchema: schema });
const { value: title, errorMessage: titleError } = useField('title');
const { value: company, errorMessage: companyError } = useField('company');
const { value: job_type, errorMessage: job_typeError } = useField('job_type');

const successMessage = ref('');

const errors = {
  title: titleError || '',
  company: companyError || '',
  job_type: job_typeError || '',
};

const submitting = ref(false);

const onHandleSubmit = handleSubmit(async (values) => {
  submitting.value = true;
  try {
    const slug = title.value.toLowerCase().replace(/ /g, '-');
    await jobStore.addJob(values.title, values.company, values.job_type);
    // No need to check Response.ok here, it's automatically handled by try-catch
    successMessage.value = 'Job added successfully!';
    router.push({ name: 'jobs-slug', params: { slug: slug } });
  } catch (error) {
    console.log(error);
  } finally {
    submitting.value = false;
  }
});

onMounted(() => {
  if (jobStore.user === null) {
    router.push('/accounts/login');
  }
  companyStore.fetchMyCompanies();
  jobStore.fetchJobs()
});
</script>
