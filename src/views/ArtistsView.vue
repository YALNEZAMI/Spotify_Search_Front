<template>
  <div class="w-screen min-h-screen bg-black pt-2">
    <h1 class="text-white hover:text-gray-400">Artists</h1>
    <hr />
    <div class="flex text-white flex-wrap py-3 w-full">
      <ArtistElement
        class=""
        v-for="artist in store.state.artists"
        :key="artist.id"
        :artist="artist"
      />
    </div>
  </div>
</template>
<style scoped></style>
<script setup>
//import section
import ArtistElement from "../components/Artist.vue";
import { useStore } from "vuex";
const store = useStore();
if (store.state.artists.length == 0) {
  store.dispatch("getArtists");
}
</script>
