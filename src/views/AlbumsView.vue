<template>
  <div class="w-screen min-h-screen bg-black pt-2">
    <h1 class="text-white hover:text-gray-400">Albums</h1>
    <hr />
    <div class="flex w-full text-white flex-wrap py-3">
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
if (store.state.albums.length == 0) {
  store.dispatch("getAlbums");
}
</script>
