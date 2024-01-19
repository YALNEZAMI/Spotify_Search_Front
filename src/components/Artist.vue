<template>
  <div
    class="bg-black hover:bg-gray-700 text-white border-2 border-gray-400 min-w-28 max-w-32 h-48 m-2 cursor-pointer p-1 relative rounded"
  >
    <div @click="goTo" class="flex justify-center">
      <img
        :style="{
          width: '100%',
          height: '100%',
        }"
        class="rounded-full max-w-28 max-h-28 text-white"
        :src="artist.images[0].url"
        onerror="this.src='/default_artist.jpg'"
        alt="img"
      />
    </div>
    <div @click="goTo" class="text-center font-bold h-7 my-1 truncate">
      {{ getName() }}
    </div>
    <div
      class="font-serif truncate text-sm hover:underline flex justify-center space-x-3 text-gray-400 h-7"
    >
      <span>{{ artist.followers.total }}</span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-people-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        />
      </svg>
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
import { defineProps } from "vue";
const { artist } = defineProps(["artist"]);

const goTo = () => {
  window.open(artist.external_urls.spotify, "_blank");
};
const getName = () => {
  let name = artist.name;
  if (name.length > 13) {
    return name.substring(0, 10) + "...";
  } else {
    return name;
  }
};
</script>
