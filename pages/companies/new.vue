<template>
  <div class="min-w-full mb-7">
    <FormsTiptap label="Company Description" v-model="description" />
  </div>
</template>
<script setup>
const description = ref('')

watch(content, (newValue) => {
  company.value.description = newValue
})

const submitEvent = async () => {
  console.log(company.value.description)
}
</script>
```