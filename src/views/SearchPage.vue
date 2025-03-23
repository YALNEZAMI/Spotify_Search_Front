<template>
  <main class="bg-black min-h-screen h-full p-1">
    <div class="w-full z-20 bg-black p-2 flex justify-center">
      <div class="w-3/4">
        <!--search bar component div-->
        <div class="flex justify-center">
          <SearchInputElement @search="search" class="w-full" />
        </div>
        <!--navigation bar-->
        <div class="nav text-white mt-1 flex flex-wrap justify-center">
          <!--items de la barre de navigation-->
          <span
            @click="navigateTo(item.name)"
            v-for="item in items"
            :key="item.name"
            :class="{
              'm-1 sm:my-2 p-1 cursor-pointer px-2 bg-gray-800 border-2 rounded-3xl border-white ': true,
              'bg-white text-black border-2 rounded-3xl border-white':
                item.name === selectedItem,
              'hover:bg-white hover:text-black hover:border-2 hover:border-white':
                item.name !== selectedItem,
            }"
            >{{ item.name }}</span
          >
        </div>
      </div>
    </div>
    <!--main content-->
    <div class="w-full">
      <div class="w-full h-full bg-black pt-2">
        <!--nom de l'entité à afficher-->
        <h1 class="text-white hover:text-gray-200 pl-2">{{ selectedItem }}</h1>
        <hr />
        <!--chansons component-->
        <div
          v-show="selectedItem == 'Chansons' || selectedItem == 'Tout'"
          class="flex overflow-y-auto sm:pr-18 text-white flex-wrap py-3 px-1 border-b-2 border-white"
          style="max-height: 70vh"
        >
          <ChansonElement
            v-for="chanson in store.state.searchedChansons"
            :key="chanson.id"
            :chanson="chanson"
          />
        </div>

        <div
          v-show="selectedItem == 'Albums' || selectedItem == 'Tout'"
          class="flex overflow-y-auto sm:pr-18 text-white flex-wrap py-3 border-b-2 border-white"
          style="max-height: 70vh"
        >
          <!--albums component-->
          <AlbumElement
            v-for="album in store.state.searchedAlbums"
            :key="album.id"
            :album="album"
          />
        </div>

        <div
          class="flex overflow-y-auto pr-18 text-white flex-wrap py-3 border-b-2 border-white"
          v-show="selectedItem == 'Artists' || selectedItem == 'Tout'"
          style="max-height: 70vh"
        >
          <!--artists component-->
          <ArtistElement
            v-for="artist in store.state.searchedArtists"
            :key="artist.id"
            :artist="artist"
          />
        </div>

        <div
          v-show="selectedItem == 'Playlists' || selectedItem == 'Tout'"
          class="flex overflow-y-auto pr-18 text-white flex-wrap py-3 border-b-2 border-white"
          style="max-height: 70vh"
        >
          <!--playlists component-->
          <PlayListElement
            class=""
            v-for="(playlist, i) in store.state.searchedPlaylists"
            :key="i"
            :playlist="playlist"
          />
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped></style>
<script setup>
import SearchInputElement from "../components/SearchInput.vue";
import AlbumElement from "../components/Album.vue";
import ArtistElement from "../components/Artist.vue";
import ChansonElement from "../components/Chanson.vue";
import PlayListElement from "../components/PlayList.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

const store = useStore();
const router = useRouter();
let items = [
  { name: "Chansons" },
  { name: "Albums" },
  { name: "Artists" },
  { name: "Playlists" },
];
const selectedItem = ref(items[0].name);
const search = async (searchInput) => {
  if (!searchInput) {
    return;
  }
  try {
    //set items in the store
    await store.dispatch("searchAlbums", searchInput);
    await store.dispatch("searchSongs", searchInput);
    await store.dispatch("searchArtists", searchInput);
    await store.dispatch("searchPlaylists", searchInput);
  } catch (error) {
    router.push("/login");
  }
};
const navigateTo = (path) => {
  selectedItem.value = path;
};
// const shuffle = (tab) => {
//   //on melange aleatoirement le tableau
//   tab.sort(() => Math.random() - 0.5);
// };
</script>
