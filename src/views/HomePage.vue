<template>
  <main class="bg-black min-h-screen">
    <!--spinner-->
    <div class="text-center fixed top-1/2 left-1/2 z-20" v-if="!initDone">
      <div role="status">
        <svg
          aria-hidden="true"
          class="inline w-8 h-8 text-white animate-spin dark:text-black fill-black"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
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
        <span class="text-xs">{{ store.state.profile.display_name }}</span>
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
          <PlayListElement
            v-show="item.name === 'playlists'"
            class=""
            v-for="playlist in playlistsTab"
            :key="playlist.id"
            :playlist="playlist"
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
import PlayListElement from "../components/PlayList.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

//init a router
const router = useRouter();
//init a store
const store = useStore();
const items = ref([
  { name: "chansons" },
  { name: "albums" },
  { name: "artists" },
  { name: "playlists" },
]);
const chansonsTab = ref([]);
const albumsTab = ref([]);
const artistsTab = ref([]);
const playlistsTab = ref([]);
const initDone = ref(false);
onMounted(async () => {
  //si le store est vide, on récupère les chansons, albums et artists par défaut
  if (
    store.state.chansons.length == 0 ||
    store.state.albums.length == 0 ||
    store.state.artists.length == 0
  ) {
    //if the store is empty, we get the default chansons, albums and artists
    await store.dispatch("getDefaultSongs");
    await store.dispatch("getDefaultAlbums");
    await store.dispatch("getDefaultArtists");
    await store.dispatch("getDefaultPlaylists");
    await store.dispatch("getMyPlaylists");

    //set searched items to have the same value as the default items
    store.commit("setSearchedChansons", store.state.chansons);
    store.commit("setSearchedAlbums", store.state.albums);
    store.commit("setSearchedArtists", store.state.artists);
  }
  chansonsTab.value = store.state.chansons.slice(0, 15);
  albumsTab.value = store.state.albums.slice(0, 15);
  artistsTab.value = store.state.artists.slice(0, 15);
  //mettre mes playlists en avant
  let searchedPlaylists = store.state.searchedPlaylists;
  playlistsTab.value = store.state.myPlaylists
    .concat(searchedPlaylists)
    .slice(0, 15);
  initDone.value = true;
});

const download = () => {
  window.open("https://www.spotify.com/fr/download/windows/", "_blank");
};
const goToItems = (item) => {
  router.push("/" + item);
};
</script>
