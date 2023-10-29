<template>
  <div class="bg-slate-100 dark:bg-slate-900">
    <NavsTopnav/>
    <div class="mx-auto container px-32">
      <NuxtPage/>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from './store/accounts';
import { storeToRefs } from 'pinia';


const accountStore = useAccountStore()
const { user } = storeToRefs(accountStore)
</script>