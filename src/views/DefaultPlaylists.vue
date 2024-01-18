<template>
  <div
    style="
       {
        width: 70%;
      }
    "
    class="bg-black pt-2 w-full min-h-screen truncate overflow-x-hidden"
  >
    <div class="flex justify-between pr-16">
      <h1 class="text-white hover:text-gray-400">Playlists</h1>
      <svg
        @click="$router.push('/profile')"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-white cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z"
        />
      </svg>
    </div>
    <hr />
    <div
      :style="{
        paddingRight: '13%',
      }"
      class="flex text-white flex-wrap w-full truncate"
    >
      <PlayListElement
        class=""
        v-for="playlist in playlistsTab"
        :key="playlist.id"
        :playlist="playlist"
      />
    </div>
  </div>
</template>
<style scoped></style>
<script setup>
//import section
import PlayListElement from "../components/PlayList.vue";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
const store = useStore();
//mettre mes playlists en avant
let playlistsTab = ref([]);
onMounted(async () => {
  if (store.state.myPlaylists.length === 0) {
    await store.dispatch("getMyPlaylists");
    await store.dispatch("getDefaultPlaylists");
  }
  let myPlaylists = store.state.myPlaylists;
  let searchedPlaylists = store.state.searchedPlaylists;
  playlistsTab.value = myPlaylists.concat(searchedPlaylists).slice(0, 15);
});
</script>
