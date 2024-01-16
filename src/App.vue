<template>
  <div class="flex">
    <div class="min-w-44 h-screen bg-black fixed"><SideBar /></div>
    <router-view class="ml-48" />
  </div>
</template>
<style scoped></style>
<script setup>
import SideBar from "./components/SideBar.vue";
</script>
