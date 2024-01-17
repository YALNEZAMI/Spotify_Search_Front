<template>
  <div
    class="bg-black hover:bg-gray-700 text-white border-2 border-white min-w-32 h-48 m-2 cursor-pointer p-1 relative rounded"
  >
    <div @click="goTo"><img :src="album.images[0].url" alt="" /></div>
    <div @click="goTo" class="text-center font-bold h-7 my-1 truncate">
      {{ album.name }}
    </div>
    <div class="font-serif truncate text-sm hover:underline text-gray-400 h-7">
      <span
        @click="goToArtist(artist.external_urls.spotify)"
        v-for="(artist, index) in album.artists"
        :key="artist"
      >
        {{ artist.name }}
        <span v-if="index != album.artists.length - 1">,</span> </span
      ><span v-if="album.artists.length > 1">.</span>
    </div>
  </div>
</template>
<style scoped>
.rowy {
  display: flex;
  flex-direction: row;
}
.artist {
  position: absolute;
  top: 15%;
  left: 5px;
}
</style>
<script setup>
import { defineProps } from "vue";
const { album } = defineProps(["album"]);
const goTo = () => {
  window.open(album.external_urls.spotify, "_blank");
};
const goToArtist = () => {
  window.open(album.artists[0].external_urls.spotify, "_blank");
};
const getAlbumName = () => {
  let name = album.name;
  if (name.length > 30) {
    return name.substring(0, 30) + "...";
  } else {
    return name;
  }
};
const getArtistName = () => {
  let name = album.artists[0].name;
  if (name.length > 10) {
    return name.substring(0, 10) + "...";
  } else {
    return name;
  }
};
const getType = () => {
  return album.album_type;
};
const getDate = () => {
  let date = album.release_date;
  let tab = date.split("-");
  const year = tab[0];
  const month = tab[1];
  const day = tab[2];
  return day + "/" + month + "/" + year;
};
</script>
