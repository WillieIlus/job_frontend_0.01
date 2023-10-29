<template>
  <form class="w-full max-w-lg" @submit.prevent="submit">
    <input
      type="text"
      class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-indigo-800"
      placeholder="Search"
    />
    <slot></slot>
  </form>
</template>

<script setup>
const submit = null;
</script>
