<template>
  <div class="relative">
    <div
      v-if="hover"
      id="toolTip"
      class="border-2 border-white p-2 h-maw whitespace-normal rounded bg-gray-800 text-white"
    >
      {{ playlist.description }}
    </div>
    <div
      @mouseover="hover = true"
      @mouseout="hover = false"
      class="bg-black hover:bg-gray-700 text-white border-2 border-white min-w-28 h-48 m-2 cursor-pointer p-1 relative rounded"
    >
      <div @click="goTo">
        <img class="w-28 h-30" :src="playlist.images[0].url" alt="" />
      </div>
      <div @click="goTo" class="text-center font-bold h-7 my-1 truncate">
        {{ getPlaylistName() }}
      </div>
      <div
        class="font-serif truncate text-sm hover:underline text-gray-400 h-7"
      >
        <span @click="goToArtist(playlist.owner.external_urls.spotify)">
          {{ getOwnerName() }}
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.rowy {
  display: flex;
  flex-direction: row;
}
#toolTip {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 125px;
  height: 125px;
  overflow-y: auto;
  z-index: 2;
}
</style>
<script setup>
import { defineProps, onMounted, computed, ref } from "vue";
const { playlist } = defineProps(["playlist"]);
console.log(playlist);
const hover = ref(false);

const goTo = () => {
  window.open(playlist.external_urls.spotify, "_blank");
};
const goToArtist = (url) => {
  window.open(url, "_blank");
};

const getPlaylistName = () => {
  if (playlist.name.length > 15) {
    return playlist.name.substring(0, 13) + "...";
  } else {
    return playlist.name;
  }
};
const getOwnerName = () => {
  if (playlist.owner.display_name.length > 15) {
    return playlist.owner.display_name.substring(0, 13) + "...";
  } else {
    return playlist.owner.display_name;
  }
};
</script>
