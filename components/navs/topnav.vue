<template>
  <div as="nav" class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <div @click="showMenu = !showMenu"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="showMenu" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </div>
          </div>
          <div class="flex flex-shrink-0 items-center">
            <img class="block h-8 w-auto lg:hidden" src=""
              alt="Your Company" />
            <img class="hidden h-8 w-auto lg:block" src=""
              alt="Your Company" />
          </div>
          <div class="md:ml-6 md:flex md:items-center my-4 md:space-x-4 md:hidden lg:block">
            <NuxtLink v-for="(item, index) in navItems" :key="index" :to="item.Link.to"
              :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']"
              :aria-current="item.current ? 'page' : undefined">
              <item.icon class="h-6 w-6 hidden md:inline" />{{ item.name }}
            </NuxtLink>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <button
              class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800">
              <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
              <span>New Job</span>
            </button>
          </div>
          <div class="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
            <button type="button"
              class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <div class="relative ml-3">
              <div @click="dropDown = !dropDown">
                <button 
                  class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" :src="user" alt="" />
                </button>
              </div>
              <div  v-if="dropDown" :class="hidden">
                <ul
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white p-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div v-if="isLoggedIn">
                    <li v-for="(item, index) in userItems" :key="index">
                      <NuxtLink :to="item.Link.to"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        :class="active ? 'bg-gray-100' : ''">
                        <item.icon class="h-6 w-6 mr-2 hidden md:inline" />{{ item.name }}
                      </NuxtLink>
                    </li>
                    <button @click="accountStore.logout"
                      class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                      <ArrowRightOnRectangleIcon class="h-6 w-6 mr-2 hidden md:inline" />Logout
                    </button>
                  </div>
                  <div v-else>
                    <li v-for="(item, index) in loginItems" :key="index"
                      class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                      <NuxtLink :to="item.Link.to" :class="active ? 'bg-gray-100' : ''">{{ item.name }}
                      </NuxtLink>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
            <!-- Profile dowpdown end -->

          </div>
        </div>
      </div>
    </div>
<!-- mobile dropdown  -->
    <div class="md:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3 md:hidden sm:hidden">
        <button v-for="item in navItems" :key="item.name" as="a" :href="item.href"
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined"><item.icon class="h-6 w-6"/>{{ item.name }}</button>
      </div>
      <div class="border-t border-gray-700 pt-4 pb-3">
        <div class="flex items-center px-5 sm:px-6">
          <div class="flex-shrink-0" >
            <img class="h-10 w-10 rounded-full" :src="user" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">{{ user }} first_name</div>
            <div class="text-sm font-medium text-gray-400">{{ user }} email </div>
          </div>
          <button type="button"
            class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div v-if="isLoggedIn">
          <div class="mt-3 space-y-1 px-2 sm:px-3">
            <button v-for="item in userItems" :key="item.name"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
              <item.icon class="h-6 w-6 hidden md:inline" />{{ item.name }}
            </button>
            <button @click="accountStore.logout"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
              <ArrowRightOnRectangleIcon class="h-6 w-6 hidden md:inline" />Logout
            </button>
          </div>
        </div>
        <div v-else>
          <div class="mt-3 space-y-1 px-2 sm:px-3">
            <button v-for="item in loginItems" :key="item.name"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
              <item.icon class="h-6 w-6 hidden md:inline" />{{ item.name }}
            </button>

          </div>
        </div>
      </div>
    </div>
<!-- mobile dropdown end  -->
  </div>
</template>

<script setup>
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { PlusIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import { HomeIcon, BriefcaseIcon, CogIcon, RectangleGroupIcon, MapPinIcon, BuildingOffice2Icon, UserIcon, UserPlusIcon, ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useAccountStore } from '~/store/accounts';
import logoImage from '@/assets/images/logo.png'

const accountStore = useAccountStore()
const { user, isLoggedIn } = storeToRefs(accountStore)
const route = useRoute()

const showMenu = ref(false)
const dropDown = ref(false)

const logo = {
  name: 'Job Board',
  imageUrl: logoImage,
  link: {
    to: '/'
  }
}


const newJobButton = { name: 'New Job', icon: PlusIcon, Link: { to: '/new-job' } };
const logout = () => { accountStore.logout() }

const navItems = [
  { name: 'Home', icon: HomeIcon, Link: { to: '/' }, current: route.name === 'index' },
  { name: 'Jobs', icon: BriefcaseIcon, Link: { to: '/jobs' }, current: route.name.includes('jobs') },
  { name: 'Companies', icon: BuildingOffice2Icon, Link: { to: '/companies' }, current: route.name.includes('companies') },
  { name: 'Categories', icon: RectangleGroupIcon, Link: { to: '/categories' }, current: route.name.includes('categories') },
  { name: 'Locations', icon: MapPinIcon, Link: { to: '/locations' }, current: route.name.includes('locations') },
]

const userItems = [
  { name: 'Profile', icon: UserIcon, Link: { to: '/accounts/profile' }, current: route.name.includes('profile') },
  { name: 'Settings', icon: CogIcon, Link: { to: '/accounts' }, current: route.name.includes('settings') },
]

const loginItems = [
  { name: 'Login', icon: ArrowLeftOnRectangleIcon, Link: { to: '/accounts/login' }, current: route.name.includes('login') },
  { name: 'Register', icon: UserPlusIcon, Link: { to: '/accounts/register' }, current: route.name.includes('register') },
]

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