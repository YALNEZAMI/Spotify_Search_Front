<template>
  <div>
    <div class="min-w-44 h-screen bg-black fixed"><SideBar /></div>
    <router-view class="ml-44 p-3" />
  </div>
</template>
<style scoped></style>
<script setup>
import SideBar from "./components/SideBar.vue";
</script>
