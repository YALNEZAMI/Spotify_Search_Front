<template>
  <main class="bg-black min-h-screen">
    <div class="text-center flex flex-row justify-end">
      <SearchInput @search="search" class="w-3/4" />
      <div
        class="profile flex flex-col justify-center rounded h-11 p-1 bg-white ml-3"
      >
        <img
          class="w-20 h-5"
          src="../../public/Spotify_Logo_CMYK_Black.png"
          alt=""
        />
        <span>Yaser</span>
      </div>
    </div>
    <div class="flex flex-row justify-center space-x-20 mt-3 border-2 py-1">
      <div
        v-for="choise in choises"
        :key="choise"
        :style="{
          backgroundColor: choise.bg,
        }"
        :class="{
          'rounded min-w-32 text-center text-white p-2 cursor-pointer hover:bg-gray-200 hover:opacity-100': true,
          'opacity-50': searchChoise !== choise.name,
        }"
        @click="changeChoice(choise.name)"
      >
        {{ choise.name }}
      </div>
    </div>
    <div class="flex flex-row flex-wrap justify-center">
      <ChansonElement
        v-show="searchChoise === 'chansons'"
        class="mx-3 w-full md:w-2/5 bg-green-500 my-2"
        v-for="chanson in chansons"
        :key="chanson.id"
        :chanson="chanson"
      />
      <AlbumElement
        v-show="searchChoise === 'albums'"
        class="mx-3 w-full md:w-2/5 bg-red-500 my-2 cursor-pointer rounded"
        v-for="album in albums"
        :key="album.id"
        :album="album"
      />
      <ArtistElement
        v-show="searchChoise === 'artists'"
        class="mx-3 w-full md:w-2/5 bg-blue-500 text-white my-2 rounded p-2"
        v-for="artist in artists"
        :key="artist.id"
        :artist="artist"
      />
    </div>
  </main>
</template>
<style scoped></style>
<script setup>
//import section
import SearchInput from "../components/SearchInput.vue";
import ChansonElement from "../components/Chanson.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AlbumElement from "../components/Album.vue";
import ArtistElement from "../components/Artist.vue";
//init a router
const router = useRouter();
//init a store
const store = useStore();

const searchChoise = ref("chansons");
const choises = ref([
  { name: "chansons", bg: "green" },
  { name: "albums", bg: "red" },
  { name: "artists", bg: "blue" },
]);
let searchKey = "";
const chansons = ref([]);
const albums = ref([]);
const artists = ref([]);
onMounted(async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    store.commit("setToken", accessToken);
  }
  const chansons = await store.dispatch("searchSongs", "eminem");
  chansons.value = chansons;
});
const search = async (searchInput) => {
  if (!searchInput) {
    return;
  }
  try {
    searchKey = searchInput;
    switch (searchChoise.value) {
      case "chansons":
        const chansonsResult = await store.dispatch("searchSongs", searchInput);
        chansons.value = chansonsResult;
        break;
      case "albums":
        const albumsResult = await store.dispatch("searchAlbums", searchInput);
        albums.value = albumsResult;
        break;

      case "artists":
        const artistsResult = await store.dispatch(
          "searchArtists",
          searchInput
        );
        artists.value = artistsResult;

        break;

      default:
        break;
    }
  } catch (error) {
    router.push("/login");
  }
};
const changeChoice = async (choise) => {
  searchChoise.value = choise;
  await search(searchKey);
};
</script>
