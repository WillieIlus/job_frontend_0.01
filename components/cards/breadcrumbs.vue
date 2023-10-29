<template>
  
  <nav class="w-full  flex justify-center m-16 ">
    <ol class="list-reset flex justify-center text-neutral-600 dark:text-neutral-300">
      <li v-for="(item, index) in items" :key="index" :class="{ 'text-primary': item.action, 'text-neutral-400': !item.action, 'cursor-pointer': item.action, 'cursor-not-allowed': !item.action }">
        <button class="btn btn-link" @click="selectItem(item)" :disabled="!item.action">{{ item.label }}</button>
        <span v-if="!isLast(index)" class="mx-2"> | </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['items']);

const isLast = (index) => index === props.items.length - 1;

const selectItem = (item) => {
  if (item.action) {
    item.action();
  }
};

</script>
