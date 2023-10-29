
<template>
  <CardsBase>
    <form>
      <div class="mb-4 flex items-center">
        <input type="text" class="w-full rounded-lg border border-gray-400 p-2 mr-3 " placeholder="Search ..." />
        <input type="text" class="w-full rounded-lg border border-gray-400 p-2 mr-3 " placeholder="Search ..." />
        <input type="text" class="w-full rounded-lg border border-gray-400 p-2 mr-3" placeholder="Search ..." />
        <ButtonsGreen class="flex items-center"><MagnifyingGlassIcon class="mr-2 h-5 w-5"/> Search </ButtonsGreen>
      </div>
    </form>
  </CardsBase>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const handleSearch = () => {
  // Implement your search logic here
  console.log('Searching...');
};
</script>


<!-- <script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
</script> -->