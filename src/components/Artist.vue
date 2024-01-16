<template>
  <main>
    <div class="flex flex-col cursor-pointer space-y-3" @click="goTo">
      <div class="flex justify-center space-x-2">
        <span class="ml-20"
          ><img :src="artist.images[0].url" class="w-14 h-14 rounded-full"
        /></span>
        <span class="pt-2 min-w-28">{{ getName() }}</span>
      </div>
      <div class="flex flex-row justify-center space-x-32">
        <!--artist followers number-->
        <div class="rowy space-x-2 hover:text-green-500">
          <span>{{ artist.followers.total }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-people-fill text-green-500 mt-1"
            viewBox="0 0 16 16"
          >
            <path
              d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
            />
          </svg>
        </div>
        <!--artist popularity-->
        <div class="rowy space-x-2 hover:text-red-500">
          <span>{{ artist.popularity }}</span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            :class="{
              'w-6 h-6': true,
              'text-red-500': artist.popularity > 70,
              'text-yellow-500':
                artist.popularity > 30 && artist.popularity < 70,
              'text-blue-500': artist.popularity < 30,
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
        <!--artist music type-->
        <div class="rowy space-x-2 hover:text-pink-500">
          <span>{{ artist.genres[0] }}</span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-pink-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
            />
          </svg>
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
</style>
<script setup>
import { defineProps } from "vue";
const { artist } = defineProps(["artist"]);
console.log(artist);
const goTo = () => {
  window.open(artist.external_urls.spotify, "_blank");
};
const getName = () => {
  let name = artist.name;
  if (name.length > 10) {
    return name.substring(0, 10) + "...";
  } else {
    return name;
  }
};
</script>
