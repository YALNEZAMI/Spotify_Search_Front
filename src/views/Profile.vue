<template>
  <div class="bg-black h-screen text-white">
    <div class="flex justify-end">
      <div
        @click="logout"
        class="flex space-x-2 border-2 cursor-pointer border-white w-max p-1 rounded hover:bg-gray-200 hover:text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>
        <span>Logout</span>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex justify-center">
        <img
          @click="goTo"
          class="cursor-pointer"
          v-if="store.state.profile.images.length > 0"
          :src="store.state.profile.images[0].url"
          alt=""
        />
        <img
          @click="goTo"
          v-if="store.state.profile.images.length == 0"
          class="rounded-full w-32 cursor-pointer"
          src="/default_user.png"
          alt=""
        />
      </div>
      <div
        @click="goTo"
        class="flex justify-center cursor-pointer font-bold m-2 hover:underline"
      >
        {{ store.state.profile.display_name }}
      </div>
      <div class="flex flex-row space-x-10 justify-center">
        <div class="flex space-x-2">
          <span>{{ store.state.profile.country }}</span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
            />
          </svg>
        </div>
        <div class="flex space-x-2">
          <span>{{ store.state.profile.email }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <div class="flex space-x-2">
          <span> {{ store.state.profile.followers.total }}</span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-people-fill mt-1"
            viewBox="0 0 16 16 "
          >
            <path
              d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <h1 class="mt-3">Playlists</h1>
      <span
        @click="$router.push('/myplaylists')"
        class="text-gray-400 cursor-pointer pt-3 hover:underline"
        >Tout voir</span
      >
    </div>
    <hr />
    <div class="flex flex-row text-white overflow-x-auto">
      <PlaylListElement
        class=""
        v-for="playlist in store.state.myPlaylists"
        :key="playlist.id"
        :playlist="playlist"
      />
    </div>
  </div>
</template>
<style scoped>
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import PlaylListElement from "../components/PlayList.vue";
import { onMounted, ref } from "vue";
const router = useRouter();
const store = useStore();
const goTo = () => {
  window.open(store.state.profile.external_urls.spotify, "_blank");
};
const logout = () => {
  store.commit("logout");
  router.push("/login");
};
onMounted(async () => {
  await store.dispatch("getMyPlaylists");

  // const getMySongs = await store.dispatch("getMySongs");
  // console.log(getMySongs);
  // const getMyLikedSongs = await store.dispatch("getMyLikedSongs");
  // console.log(getMyLikedSongs);
});
</script>
