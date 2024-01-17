<template>
  <div class="w-screen min-h-screen bg-black pt-2">
    <h1 class="text-white hover:text-gray-400">Albums</h1>
    <hr />
    <div class="flex pr-20 text-white flex-wrap p-3 w-11/12">
      <AlbumElement
        class=""
        v-for="album in store.state.albums"
        :key="album.id"
        :album="album"
      />
    </div>
  </div>
</template>
<style scoped></style>
<script setup>
//import section
import AlbumElement from "../components/Album.vue";
import { useStore } from "vuex";
const store = useStore();
</script>
