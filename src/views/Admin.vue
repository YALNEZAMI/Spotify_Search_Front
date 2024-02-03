<template>
  <div>
    <!--side bar-->
    <div
      class="sm:min-w-44 min-w-10 h-full bg-black fixed border-r-2 border-white z-20"
    >
      <SideBar />
    </div>
    <!--main content-->
    <router-view
      :class="{
        'p-2 pl-6 sm:pl-4  ml-14 sm:ml-44   ': true,
      }"
    />
  </div>
</template>
<style scoped></style>
<script setup>
//import section
import SideBar from "../components/SideBar.vue";
</script>
