<script setup>
import SideBar from './components/SideBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex">
    <SideBar />
    <RouterView />
  </div>
</template>
