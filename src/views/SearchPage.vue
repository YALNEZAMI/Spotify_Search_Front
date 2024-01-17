<template>
  <main class="bg-black min-h-screen h-full w-full">
    <div
      :style="{
        marginRight: '20%',
      }"
      class="flex justify-center"
    >
      <SearchInputElement @search="search" class="w-2/3" />
      <div class="text-white">
        {{ store.state.searchedChansons.length }}
        {{ store.state.searchedAlbums.length }}
        {{ store.state.searchedArtists.length }}
      </div>
    </div>
    <!--navigation bar-->
    <div
      :style="{
        marginRight: '20%',
      }"
      class="nav text-white my-1 flex justify-center"
    >
      <span
        @click="navigateTo(item.name)"
        class="m-2 p-1 cursor-pointer px-2 bg-gray-800 border-2 rounded-3xl border-white"
        v-for="item in items"
        :key="item.name"
        :class="{
          'bg-gray-200 text-black border-2 rounded-3xl border-white':
            item.name === selectedItem,
          'hover:bg-gray-800 hover:border-2 hover:border-white':
            item.name !== selectedItem,
        }"
        >{{ item.name }}</span
      >
    </div>
    <!--main content-->
    <div class="w-screen">
      <div class="w-full h-full bg-black pt-2">
        <h1 class="text-white hover:text-gray-200">{{ selectedItem }}</h1>
        <hr />
        <div class="flex pr-20 text-white flex-wrap p-3 w-11/12">
          <!--chansons-->
          <ChansonElement
            v-show="selectedItem == 'Chansons'"
            v-for="chanson in store.state.searchedChansons"
            :key="chanson.id"
            :chanson="chanson"
          />
          <!--albums-->
          <AlbumElement
            v-show="selectedItem == 'Albums'"
            v-for="album in store.state.searchedAlbums"
            :key="album.id"
            :album="album"
          />
          <!--artists-->
          <ArtistElement
            v-show="selectedItem == 'Artists'"
            v-for="artist in store.state.artists"
            :key="artist.id"
            :artist="artist"
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

const store = useStore();
const router = useRouter();
let items = [
  { name: "Chansons", path: "/chansons" },
  { name: "Albums", path: "/albums" },
  { name: "Artists", path: "/artists" },
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
  } catch (error) {
    router.push("/login");
  }
};
const navigateTo = (path) => {
  console.log(path);
  selectedItem.value = path;
};
</script>
