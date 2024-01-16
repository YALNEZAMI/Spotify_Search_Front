<template>
  <div class="bg-green-200 text-black cursor-pointer p-2 relative rounded">
    <div class="flex justify-center">
      <!--artist div-->
      <div
        class="flex flex-col justify-center artist space-y-2 hover:text-gray-400"
        @click="goToArtist"
      >
        <div class="flex justify-center">
          <img class="w-10 rounded-full" :src="chanson.album.images[0].url" />
        </div>
        <span class="min-w-20 text-center">{{ getArtistName() }}</span>
      </div>
      <!--song div-->
      <div @click="goTo">
        <!--song name-->
        <div class="text-center my-4 font-bold">
          <ins>{{ getSongName() }}</ins>
        </div>
        <!--song propertys-->
        <div class="flex justify-center space-x-24 pl-12">
          <!--song duration-->
          <div class="rowy space-x-2 hover:text-yellow-500">
            <span>{{ getDuration() }}</span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 mt-1 text-yellow-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <!--song popularity-->
          <div class="rowy space-x-2 hover:text-red-500">
            <span>{{ chanson.popularity }}</span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              :class="{
                'w-6 h-6': true,
                'text-red-500': chanson.popularity > 70,
                'text-yellow-500':
                  chanson.popularity > 30 && chanson.popularity < 70,
                'text-blue-500': chanson.popularity < 30,
              }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              />
            </svg>
          </div>
          <!--song release date-->
          <div class="rowy space-x-2 hover:text-blue-500">
            <span>{{ getDate() }}</span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-blue-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
          </div>
        </div>
      </div>
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
import { defineProps, onMounted, computed, ref } from "vue";
const { chanson } = defineProps(["chanson"]);
const goTo = () => {
  window.open(chanson.external_urls.spotify, "_blank");
};
const goToArtist = () => {
  window.open(album.artists[0].external_urls.spotify, "_blank");
};
const getDuration = () => {
  const ms = chanson.duration_ms;
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
const getSongName = () => {
  if (chanson.name.length > 30) {
    return chanson.name.substring(0, 30) + "...";
  } else {
    return chanson.name;
  }
};
const getArtistName = () => {
  if (chanson.artists[0].name.length > 7) {
    return chanson.artists[0].name.substring(0, 7) + "...";
  } else {
    return chanson.artists[0].name;
  }
};
const getDate = () => {
  let date = chanson.album.release_date;
  let tab = date.split("-");
  const year = tab[0];
  const month = tab[1];
  const day = tab[2];
  return day + "/" + month + "/" + year;
};
</script>
