<template>
  <div
    class="bg-black tt_container hover:bg-gray-700 text-white border-2 border-white min-w-28 max-w-28 h-48 m-2 cursor-pointer p-1 relative rounded"
  >
    <div
      class="toolTip border-2 border-white p-2 h-maw whitespace-normal rounded bg-gray-800 text-white"
    >
      {{ playlist.description }}
    </div>
    <div @click="goTo">
      <img
        class="w-28 h-30"
        :src="playlist.images[0].url"
        alt="playlist img"
        onerror="this.src='/default_playlist.jpg'"
      />
    </div>
    <div @click="goTo" class="text-center font-bold h-7 my-1 truncate">
      {{ getPlaylistName() }}
    </div>
    <div class="font-serif truncate text-sm hover:underline text-gray-400 h-7">
      <span @click="goToArtist(playlist.owner.external_urls.spotify)">
        {{ getOwnerName() }}
      </span>
    </div>
  </div>
</template>
<style scoped>
.rowy {
  display: flex;
  flex-direction: row;
}

.toolTip {
  display: none;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 124px;
  height: 125px;
  overflow-y: auto;
  z-index: 2;
}
.tt-container {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}
.tt_container:hover .toolTip {
  display: block;
}
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
import { defineProps, onMounted, computed, ref } from "vue";
const { playlist } = defineProps(["playlist"]);

const goTo = () => {
  window.open(playlist.external_urls.spotify, "_blank");
};
const goToArtist = (url) => {
  window.open(url, "_blank");
};

const getPlaylistName = () => {
  if (playlist.name.length > 16) {
    return playlist.name.substring(0, 13) + "...";
  } else {
    return playlist.name;
  }
};
const getOwnerName = () => {
  if (playlist.owner.display_name.length > 16) {
    return playlist.owner.display_name.substring(0, 13) + "...";
  } else {
    return playlist.owner.display_name;
  }
};
</script>
