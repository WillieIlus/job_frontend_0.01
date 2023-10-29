<template>
  <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>
  <LayoutColumn>
    <template #main-column>
      <CardsBase>
        <HeadingsH1>Create Company</HeadingsH1>
        <form @submit.prevent="onHandleSubmit">
          <FormsInput v-model="name" label="Name" type="text" @blur="useValidateField('name')" />
          <p v-if="errors.name" class="text-red-500">{{ errors.name }}</p>
          <FormsTiptap label="Description" v-model="content"  type="text" />
          <FormsInput v-model="phone" label="Phone" type="text" @blur="useValidateField('phone')" />
          <p v-if="errors.phone" class="text-red-500">{{ errors.phone }}</p>
          <FormsInput v-model="email" label="Email" type="text" @blur="useValidateField('email')" />
          <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
          <FormsInput v-model="address" label="Address" type="text" @blur="useValidateField('address')" />
          <p v-if="errors.address" class="text-red-500">{{ errors.address }}</p>
          <div v-if="categories" class="mb-4 flex items-center">
            <label for="category" class="block text-gray-700 text-sm font-bold mb-2 mr-2 w-32">Category</label>
            <select v-model="category" id="category"
              class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 text-indigo-800">
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
            <p v-if="errors.category" class="text-red-500">{{ errors.category }}</p>
          </div>
          <div v-if="locations" class="mb-4 flex items-center">
            <label for="location" class="block text-gray-700 text-sm font-bold mb-2 mr-2 w-32">Location</label>
            <select v-model="location" id="location"
              class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2 text-indigo-800">
              <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}</option>
            </select>
            <p v-if="errors.location" class="text-red-500">{{ errors.location }}</p>
          </div>
          <ButtonsRed class="mx-7 hover:bg-rose-900" type="cancel" :disabled="submitting"
            :class="{ 'opacity-50': submitting }" @click="router.push('/companies')">
            <span v-if="submitting">Cancel</span>
            <span v-else>Cancel</span>
          </ButtonsRed>
          <ButtonsGreen :disabled="submitting" :class="{ 'opacity-50': submitting }" type="submit">
            <span v-if="submitting">Creating Company...</span>
            <span v-else>Create Company</span>
          </ButtonsGreen>
        </form>
      </CardsBase>
    </template>
    <template #right-column>
      <CardsBase>
        <div class="p-1">
          <h1 class="text-2xl font-semibold capitalize">Your Company</h1>
        </div>
        <div class="min-w-full mb-7 p-3">
          <h2 class="text-lg font-semibold text-gray-700">Name</h2>
          <div class="min-w-full text-gray-400">{{ name }}</div>
        </div>
        <div class="min-w-full flex flex-auto gap-3 mb-7">
          <div class="p-3">
            <h2 class="text-lg font-semibold text-gray-700">Description</h2>
            <div class="min-w-full text-gray-400"><div v-html="content"></div></div>
          </div>
        </div>
        <div class="p-3">
          <h2 class="text-lg font-semibold text-gray-700">Phone</h2>
          <div class="min-w-full text-gray-400">{{ phone }}</div>
        </div>
        <div class="min-w-full flex flex-auto gap-3 mb-7">
          <div class="p-3">
            <h2 class="text-lg font-semibold text-gray-700">Email</h2>
            <div class="min-w-full text-gray-400">{{ email }}</div>
          </div>
        </div>
        <div class="p-3">
          <h2 class="text-lg font-semibold text-gray-700">Address</h2>
          <div class="min-w-full text-gray-400">{{ address }}</div>
        </div>
        <div class="min-w-full flex flex-auto gap-3 mb-7">
          <div class="p-3">
            <h2 class="text-lg font-semibold text-gray-700">Category</h2>
            <div class="min-w-full text-gray-400">{{ category }}</div>
          </div>
        </div>
        <div class="p-3">
          <h2 class="text-lg font-semibold text-gray-700">Location</h2>
          <div class="min-w-full text-gray-400">{{ location }}</div>
        </div>
      </CardsBase>
    </template>
  </LayoutColumn>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAccountStore } from '~/store/accounts'
import { useLocationStore } from '~/store/locations';
import { useCategoryStore } from '~/store/categories';
import { useCompanyStore } from '~/store/companies';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { Editor } from '@tiptap/vue-3';

const accountStore = useAccountStore()
const locationStore = useLocationStore()
const categoryStore = useCategoryStore()
const companyStore = useCompanyStore()

const router = useRouter()
const { account, loading, error } = storeToRefs(accountStore)
const { locations } = storeToRefs(locationStore)
const { categories } = storeToRefs(categoryStore)

const content = ref('')

watch(content, (newValue) => {
description.value = newValue
})

onMounted(() => {
  if (accountStore.user === null) {
    router.push('/accounts/login')
  }
  locationStore.fetchLocations()
  categoryStore.fetchCategories()
})


const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required(),
  address: yup.string().required(),
  category: yup.string(),
  location: yup.string(),
});

const { handleSubmit, validateField } = useForm({ validationSchema: schema });
const { value: name, errorMessage: nameError } = useField('name');
const { value: description, errorMessage: descriptionError } = useField('description');
const { value: phone, errorMessage: phoneError } = useField('phone');
const { value: email, errorMessage: emailError } = useField('email');
const { value: address, errorMessage: addressError } = useField('address');
const { value: category, errorMessage: categoryError } = useField('category');
const { value: location, errorMessage: locationError } = useField('location');

const successMessage = ref('')

const errors = ref({
  name: nameError || '',
  description: descriptionError || '',
  phone: phoneError || '',
  email: emailError || '',
  address: addressError || '',
  category: categoryError || '',
  location: locationError || '',
});

const submitting = ref(false);

const onHandleSubmit = handleSubmit(async (values) => {
  submitting.value = true;
  try {
    //slugify the name and use that as the slug
    const slug = name.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    await companyStore.createCompany(values.name, values.description, values.phone, values.email, values.address, values.category, values.location);
    if (response.ok) {
      name.value = '';
      description.value = '';
      phone.value = '';
      email.value = '';
      address.value = '';
      category.value = '';
      location.value = '';
      successMessage.value = 'Company created successfully!'; 
      // instead of pushing here push to it's slug. router.push('/companies');
      router.push({ name: 'companies-slug', params: { slug: slug } });
    } else {
      // Handle error responses here
      const data = await response.json();
      switch (response.status) {
        case 400:
          errors.value.name = data;
          break;
        case 403:
        case 404:
          // Handle other error codes here
          break;
        default:
          // Handle unexpected errors here
          break;
      }
    }
  } catch (error) {
    console.error(error);
    // Handle network errors here
  }
  submitting.value = false;
});

</script>
