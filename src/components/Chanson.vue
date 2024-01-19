<template>
  <div
    class="bg-black hover:bg-gray-700 text-white border-2 border-gray-400 min-w-28 max-w-28 h-48 m-2 cursor-pointer p-1 relative rounded"
  >
    <div @click="goTo">
      <img
        class="w-28 h-30"
        :src="chanson.album.images[0].url"
        onerror="this.src='/default_music.jpg'"
        alt="img"
      />
    </div>
    <div @click="goTo" class="text-center font-bold h-7 my-1 truncate">
      {{ getChansonName() }}
    </div>
    <div class="font-serif truncate text-sm hover:underline text-gray-400 h-7">
      <!--<span
        @click="goToArtist(artist.external_urls.spotify)"
        v-for="(artist, index) in chanson.artists"
        :key="artist"
      >
        {{ artist.name }}
        <span v-if="index != chanson.artists.length - 1">,</span> </span
      ><span v-if="chanson.artists.length > 1">.</span>-->
      <span @click="goToArtist(chanson.artists[0].external_urls.spotify)">
        {{ getArtistName() }}
      </span>
    </div>
  </div>
</template>
<style scoped>
.rowy {
  display: flex;
  flex-direction: row;
}
</style>
<script setup>
import { defineProps, onMounted, computed, ref } from "vue";
const { chanson } = defineProps(["chanson"]);
const goTo = () => {
  window.open(chanson.external_urls.spotify, "_blank");
};
const goToArtist = (url) => {
  window.open(url, "_blank");
};
// const getDuration = () => {
//   const ms = chanson.duration_ms;
//   const minutes = Math.floor(ms / 60000);
//   const seconds = ((ms % 60000) / 1000).toFixed(0);
//   return minutes + ":" + (seconds <script 10 ? "0" : "") + seconds;
// };
const getChansonName = () => {
  if (chanson.name.length > 16) {
    return chanson.name.substring(0, 13) + "...";
  } else {
    return chanson.name;
  }
};
const getArtistName = () => {
  if (chanson.artists[0].name.length > 16) {
    return chanson.artists[0].name.substring(0, 13) + "...";
  } else {
    return chanson.artists[0].name;
  }
};
// const getDate = () => {
//   let date = chanson.album.release_date;
//   let tab = date.split("-");
//   const year = tab[0];
//   const month = tab[1];
//   const day = tab[2];
//   return day + "/" + month + "/" + year;
// };
// const getArtistNames = () => {
//   let res = "";
//   chanson.artists.forEach((artist) => {
//     res += artist.name + ",";
//   });

//   return res.substring(0, res.length - 2) + ".";
// };
</script>
