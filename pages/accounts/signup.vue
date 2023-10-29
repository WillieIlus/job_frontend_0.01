<template>
  <CardsBase>
    <h1 class="font-bold text-lg p-3 pl-0">Signup</h1>
    <form @submit.prevent="onHandleSubmit">
      <FormsInput v-model="first_name" label="Your Name" type="text" @blur="validateField('first_name')" />
      <p v-if="errors.first_name" class="text-red-500">{{ errors.first_name }}</p>
      <FormsInput v-model="phone" label="Phone" type="text" @blur="validateField('phone')" />
      <p v-if="errors.phone" class="text-red-500">{{ errors.phone }}</p>
      <FormsInput v-model="email" label="Email" type="email" @blur="validateField('email')" />
      <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
      <FormsInput v-model="password" label="Password" type="password" @blur="validateField('password')" />
      <p v-if="errors.password" class="text-red-500">{{ errors.password }}</p>
      <FormsInput v-model="confirmPassword" label="Confirm Password" type="password"
        @blur="validateField('confirmPassword')" />
      <p v-if="errors.confirmPassword" class="text-red-500">{{ errors.confirmPassword }}</p>

      <div v-if="alerts.emailExists" class="text-red-500">Email already exists.</div>
      <!-- <div v-if="" -->
      <ButtonsGreen
      :disabled="submitting"
      :class="{ 'opacity-50': submitting }"
      type="submit"
    >
      <span v-if="submitting">Signing Up...</span>
      <span v-else>Sign Up</span>
    </ButtonsGreen>
    </form>
  </CardsBase>

</template>

<script setup>
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAccountStore } from '@/store/accounts'

const accountStore = useAccountStore()

const schema = yup.object({
  first_name: yup.string().min(3).required(),
  phone: yup.string().min(6).max(16).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
})

const { handleSubmit, validateField } = useForm({
  validationSchema: schema
})

const { value: first_name, errorMessage: first_nameError } = useField('first_name');
const { value: phone, errorMessage: phoneError } = useField('phone');
const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');
const { value: confirmPassword, errorMessage: confirmError } = useField('confirmPassword');

const errors = {
  first_name: first_nameError,
  phone: phoneError,
  email: emailError,
  password: passwordError,
  confirmPassword: confirmError
};

const submitting = ref(false)

const alerts = {
  emailExists: ref(false),
  otherError: ref(false),
};

const onHandleSubmit = handleSubmit(async (values) => {
  submitting.value = true;
  try {
    await accountStore.signup(values.email, values.first_name, values.phone, values.password);
    router.push('/accounts/login');
  } catch (error) {
    if (error.response && error.response.status === 409) {
      alerts.emailExists.value = true; 
    } else if (error.response && error.response.status === 400) {
      errors.value = error.response.data;
    } 
    else {
      alerts.otherError.value = true; 
    }
  } finally {
    submitting.value = false; 
  }
});



</script> 

