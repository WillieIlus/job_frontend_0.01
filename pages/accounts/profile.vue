<template>
  <CardsBase>
    <h1>Update Profile {{ accountStore.user.first_name }}</h1>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <form @submit.prevent="onHandleSubmit">
        <FormsInput v-model="first_name" label="Your Name" type="text" @blur="validateField('first_name')" />
        <p v-if="errors.first_name" class="text-red-500">{{ errors.first_name }}</p>
        <FormsInput v-model="phone" label="phone 07..." type="text" @blur="validateField('phone')" />
        <p v-if="errors.phone" class="text-red-500">{{ errors.phone }}</p>
        <ButtonsBase :disabled="submitting" :class="{ 'opacity-50': submitting }" type="submit">
          <span v-if="submitting">Updating...</span>
          <span v-else>Update</span>
        </ButtonsBase>
      </form>
    </div>
  </CardsBase>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useAccountStore } from '~/store/accounts'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'


const accountStore = useAccountStore();
const router = useRouter()
const isLoading = ref(true);

const schema = yup.object({
  first_name: yup.string().min(3).required(),
  phone: yup.string().min(6).max(16).required(),
})

const { handleSubmit, validateField } = useForm({
  validationSchema: schema
})

const { value: first_name, errorMessage: first_nameError } = useField('first_name');
const { value: phone, errorMessage: phoneError } = useField('phone');

const errors = {
  first_name: first_nameError,
  phone: phoneError,
};

const alerts = {
  otherError: ref(false),
};

const submitting = ref(false)

const onHandleSubmit = handleSubmit(async (values) => {
  submitting.value = true;
  try {
    await accountStore.updateUser(values.first_name, values.phone);
    router.push('/accounts');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      errors.value = error.response.data;
    } else {
      alerts.otherError.value = true;
    }
  } finally {
    submitting.value = false;
  }
});

onMounted(async () => {
  try {
    await accountStore.getUser();
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  } finally {
    isLoading.value = false;
  }
});

</script>