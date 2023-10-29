<template>
  <div class="w-96">
    <button
      type="button"
      :class="{
        'text-primary-600 font-bold bg-primary-100': isSelected,
        'text-neutral-500': !isSelected,
        'hover:bg-neutral-100 hover:text-neutral-500': !isSelected,
        'focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0': !isSelected,
        'dark:hover:bg-neutral-600 dark:hover:text-neutral-200': !isSelected,
        'dark:focus:bg-neutral-600 dark:focus:text-neutral-200': !isSelected,
        'bg-indigo-600 text-white': isSelected,
      }"
      class="block w-full cursor-pointer rounded-lg p-4 text-left transition duration-500"
      @click="isSelected = !isSelected"
    >
      <slot>List</slot>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isSelected = ref(false);
</script>
