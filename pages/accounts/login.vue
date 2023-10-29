 <template>
  <CardsBase>
    <h1 class="font-bold text-lg p-3 pl-0">Login</h1>
    <form @submit.prevent="onHandleSubmit">
      <FormsInput v-model="email" label="Email" type="email" @blur="useValidateField('email')" />
      <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
      <FormsInput v-model="password" label="Password" type="password" @blur="useValidateField('password')" />
      <p v-if="errors.password" class="text-red-500">{{ errors.password }}</p>
      <ButtonsGreen :disabled="submitting" :class="{ 'opacity-50': submitting }" type="submit">
        <span v-if="submitting">Logging In...</span>
        <span v-else>Login</span>
      </ButtonsGreen>
    </form>
  </CardsBase>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAccountStore } from '~/store/accounts'

const accountStore = useAccountStore()
const router = useRouter()

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

const { handleSubmit, validateField } = useForm({ validationSchema: schema })
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

const errors = {
  email: emailError || '',
  password: passwordError || '',
}

const submitting = ref(false)

const onHandleSubmit = handleSubmit(async (values) => {
  submitting.value = true
  try {
    await accountStore.login(values.email, values.password)
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
        case 403:
        case 404:
          errors.email = error.response.data
          break
        case 402:
          errors.password = error.response.data
          break
        default:
          break
      }
    }
  } finally {
    submitting.value = false
    router.push('/accounts')
  }
})
</script>

