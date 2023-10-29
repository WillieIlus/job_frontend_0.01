<template>
  <CardsBreadcrumbs :items="breadcrumbs" />
  <CardsBase>
    <HeadingsH1>Categories</HeadingsH1>
    <div v-if="categories">
      <div v-for="category in categories" :key="category.id">
        <CardsList>
        <NuxtLink :to="`/categories/${category.slug}`">{{ category.name }}</NuxtLink>
        </CardsList>
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

  <CardsBase>
    <h1 class="font-bold text-lg p-3 pl-0">Add Category</h1>
    <form @submit.prevent="onHandleSubmit">
      <FormsInput v-model="name" label="Name" type="text" @blur="useValidateField('name')" />
      <p v-if="errors.name" class="text-red-500">{{ errors.name }}</p>
      <FormsInput v-model="description" label="Description" type="text" @blur="useValidateField('description')" />
      <p v-if="errors.description" class="text-red-500">{{ errors.description }}</p>
      <ButtonsBase :disabled="submitting" :class="{ 'opacity-50': submitting }" type="submit">
        <span v-if="submitting">Adding...</span>
        <span v-else>Add Category</span>
      </ButtonsBase>
    </form>
  </CardsBase>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useCategoryStore } from '@/store/categories';
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

const breadcrumbs = [
  {
    label: 'Home',
    action: () => router.push({ name: 'index' }),
  },
  {
    label: 'Categories',
  },
];

const categoryStore = useCategoryStore();
const { categories, loading, error } = storeToRefs(categoryStore);
const router = useRouter();

const schema = yup.object({
  name: yup.string().min(3).required(),
  description: yup.string().min(16),
});

const { handleSubmit, validateField } = useForm({ validationSchema: schema });

const { value: name, errorMessage: nameError } = useField('name');
const { value: description, errorMessage: descriptionError } = useField('description');

const errors = {
  name: nameError || '',
  description: descriptionError || '',
};

const useValidateField = (field) => {
  validateField(field);
};

const submitting = ref(false);

const onHandleSubmit = handleSubmit(async (values) => {
  submitting.value = true;
  try {
    await categoryStore.createCategory(values.name, values.description);
    router.push({ name: '/categories' });
  } catch (error) {
    console.log(error);
  } finally {
    submitting.value = false;
  }
});

onMounted(() => {
  categoryStore.fetchCategories();
});

</script>