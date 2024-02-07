<template>
  <div class="pb-16">
    <!--side bar-->
    <div
      class="sm:min-w-44 min-w-10 h-full pb-16 bg-black fixed border-r-2 border-white z-20"
    >
      <SideBar />
    </div>
    <!--main content-->
    <router-view
      :class="{
        'p-2 pl-6 sm:pl-7  ml-14 sm:ml-44   ': true,
      }"
    />
    <!--player-->
    <div class="bg-black border-2 mx-1 fixed bottom-0 left-0 z-20 w-full h-16">
      <PlayerVue />
    </div>
  </div>
</template>
<style scoped></style>
<script setup>
//import section
import SideBar from "../components/SideBar.vue";

import PlayerVue from "../components/Player.vue";
</script>
