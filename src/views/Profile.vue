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
      <div>id: {{ store.state.profile.id }}</div>
      <div>Country: {{ store.state.profile.country }}</div>
      <div>Email: {{ store.state.profile.email }}</div>
      <div>Followers: {{ store.state.profile.followers.total }}</div>
    </div>
    <div class="flex flex-row text-white truncate">
      <ChansonElement
        v-show="item.name === 'chansons'"
        class=""
        v-for="chanson in store.state.myChansons"
        :key="chanson.id"
        :chanson="chanson"
      />
    </div>
  </div>
</template>
<style scoped></style>
<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ChansonElement from "../components/Chanson.vue";
import { onMounted } from "vue";
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
});
</script>
