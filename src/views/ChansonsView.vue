<template>
  <div
    style="
       {
        width: 70%;
      }
    "
    class="bg-black pt-2 w-full min-h-screen truncate overflow-x-hidden"
  >
    <h1 class="text-white hover:text-gray-400">Chansons</h1>
    <hr />
    <div
      :style="{
        paddingRight: '13%',
      }"
      class="flex text-white flex-wrap w-full truncate"
    >
      <ChansonElement
        class=""
        v-for="chanson in store.state.chansons"
        :key="chanson.id"
        :chanson="chanson"
      />
    </div>
  </div>
</template>
<style scoped></style>
<script setup>
//import section
import ChansonElement from "../components/Chanson.vue";
import { useStore } from "vuex";
const store = useStore();
</script>
