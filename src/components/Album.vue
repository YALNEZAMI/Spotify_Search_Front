<template>
  <main>
    <div class="relative pb-2 text-white">
      <div class="flex justify-center">
        <!--artist div-->
        <div
          class="flex flex-col justify-center space-y-2 artist hover:hover:text-black"
          @click="goToArtist"
        >
          <div class="flex justify-center">
            <img class="w-10 rounded-full" :src="album.images[0].url" />
          </div>
          <span class="min-w-20 text-center">{{ getArtistName() }}</span>
        </div>
        <!--album div-->
        <div @click="goTo">
          <!--album name-->
          <div class="text-center my-4 font-bold">
            <ins class="hover:text-xl">{{ getAlbumName() }}</ins>
          </div>
          <!--album propertys-->
          <div class="flex justify-center space-x-24 pl-12">
            <!--album type-->
            <div class="rowy space-x-2 hover:text-green-500">
              <span>{{ getType() }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-green-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                />
              </svg>
            </div>
            <!--album song number-->
            <div class="rowy space-x-2 hover:text-yellow-500">
              <span>{{ album.total_tracks }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-yellow-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                />
              </svg>
            </div>
            <!--album release date-->
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
  </main>
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
