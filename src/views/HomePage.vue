<template>
  <main class="bg-black min-h-screen">
    <div
      class="text-center flex flex-row justify-end fixed top-0 z-10 bg-black py-1 w-full md:pr-52 pr-28"
    >
      <!--installer l'appli div-->
      <div
        class="flex space-x-2 cursor-pointer text-white border-2 border-white p-2 rounded hover:bg-gray-200 hover:text-black"
        @click="download"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <span class="md:block hidden">Installer l'appli</span>
      </div>
      <!--profile div-->
      <div
        @click="$router.push('/profile')"
        class="profile cursor-pointer flex flex-col justify-center text-center rounded h-11 p-1 bg-white ml-3 min-w-20 hover:bg-black hover:text-white"
      >
        <div class="flex justify-center">
          <img
            class="w-12 h-5 mt-1"
            src="/Spotify_Icon_CMYK_Green.png"
            alt=""
          />
        </div>
        <span>{{ store.state.profile.display_name }}</span>
      </div>
    </div>
    <!--main content-->
    <div class="flex flex-col justify-center mt-10 py-1">
      <div
        v-for="item in items"
        :key="item"
        :class="{
          'rounded w-full h-1/3 min-h-48  text-white p-2  ': true,
        }"
      >
        <div class="flex justify-between">
          <span
            class="hover:opacity-75 cursor-pointer p-2 rounded text-center mt-1"
          >
            {{ item.name[0].toUpperCase() + item.name.slice(1) }}
          </span>
          <span
            @click="goToItems(item.name)"
            class="text-sm hover:opacity-75 cursor-pointer pt-5 rounded text-center mb-0 text-gray-400 hover:underline"
          >
            Tout afficher
          </span>
        </div>
        <hr class="max-w-1/4" />
        <div class="flex flex-row text-white overflow-x-auto">
          <ChansonElement
            v-show="item.name === 'chansons'"
            class=""
            v-for="chanson in chansonsTab"
            :key="chanson.id"
            :chanson="chanson"
          />
          <AlbumElement
            v-show="item.name === 'albums'"
            class="mx-3 w-full md:w-2/5 bg-red-500 my-2 cursor-pointer rounded"
            v-for="album in albumsTab"
            :key="album.id"
            :album="album"
          />
          <ArtistElement
            v-show="item.name === 'artists'"
            class="mx-3 w-full md:w-2/5 bg-blue-500 text-white my-2 rounded p-2"
            v-for="artist in artistsTab"
            :key="artist.id"
            :artist="artist"
          />
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: white;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(133, 237, 133);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(232, 144, 144);
  width: 10px;
}
</style>
<script setup>
//import section
import ChansonElement from "../components/Chanson.vue";
import AlbumElement from "../components/Album.vue";
import ArtistElement from "../components/Artist.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

//init a router
const router = useRouter();
//init a store
const store = useStore();
const items = ref([
  { name: "chansons", bg: "green" },
  { name: "albums", bg: "red" },
  { name: "artists", bg: "blue" },
]);
const chansonsTab = ref(store.state.chansons.slice(0, 10));
const albumsTab = ref(store.state.albums.slice(0, 10));
const artistsTab = ref(store.state.artists.slice(0, 10));
onMounted(async () => {
  //set chansons to store if not already set
  if (!store.state.chansons.length) {
    await store.dispatch("getDefaultSongs");
  }
  //set albums to store if not already set
  if (!store.state.albums.length) {
    await store.dispatch("getDefaultAlbums");
  }
  //set artists to store if not already set
  if (!store.state.artists.length) {
    await store.dispatch("getDefaultArtists");
  }
});

const download = () => {
  window.open("https://www.spotify.com/fr/download/windows/", "_blank");
};
const goToItems = (item) => {
  router.push("/" + item);
};
</script>
