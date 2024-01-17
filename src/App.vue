<template>
  <div>
    <!--side bar-->
    <div
      v-if="store.state.accessToken"
      class="min-w-44 h-full bg-black fixed border-r-2 border-white"
    >
      <SideBar />
    </div>
    <!--main content-->
    <router-view
      :class="{
        'ml-44': store.state.accessToken != '',
        'ml-0': store.state.accessToken == '',
        'p-2': true,
      }"
    />
  </div>
</template>
<style scoped></style>
<script setup>
import SideBar from "./components/SideBar.vue";
import { useStore } from "vuex";
const store = useStore();
</script>
