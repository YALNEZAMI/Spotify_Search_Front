<template>
  <div>
    <div class="flex justify-center p-2">
      <img
        class="w-32 hidden sm:block"
        src="/Spotify_Logo_CMYK_Green.png"
        alt=""
      />
      <img
        class="w-14 block sm:hidden"
        src="/Spotify_Icon_CMYK_Green.png"
        alt=""
      />
    </div>
    <div class="text-white mt-2 space-y-2">
      <!--accueil btn-->
      <div
        @click="
          $router.push('/admin/home');
          selectedPart = 'accueil';
        "
        :class="{
          'flex px-2 space-x-2 justify-center cursor-pointer hover:text-black hover:bg-white': true,
          'background-color': selectedPart === 'rechercher' ? 'white' : 'black',
          color: selectedPart === 'rechercher' ? 'black' : 'white',
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="min-w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <span class="min-w-32 hidden sm:block">Accueil</span>
      </div>
      <!--profile btn-->
      <div
        v-if="store.state.hasAccount"
        @click="
          $router.push('/admin/profile');
          selectedPart = 'profil';
        "
        class="flex px-2 space-x-2 justify-center cursor-pointer hover:text-black hover:bg-white"
        :style="{
          'background-color': selectedPart === 'profil' ? 'white' : 'black',
          color: selectedPart === 'profil' ? 'black' : 'white',
        }"
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
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>

        <span class="min-w-32 hidden sm:block">Profil</span>
      </div>
      <!--rechercher btn-->
      <div
        @click="
          $router.push('/admin/search');
          selectedPart = 'rechercher';
        "
        :class="{
          'flex px-2 space-x-2 justify-center cursor-pointer hover:text-black hover:bg-white': true,
          'background-color': selectedPart === 'rechercher' ? 'white' : 'black',
          color: selectedPart === 'rechercher' ? 'black' : 'white',
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 min-w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          /></svg
        ><span class="min-w-32 hidden sm:block">Rechercher</span>
      </div>
      <!--logout-->
      <div
        v-if="!store.state.hasAccount"
        @click="logout"
        class="flex px-2 space-x-2 justify-center cursor-pointer hover:text-black hover:bg-white"
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
          /></svg
        ><span class="min-w-32 hidden sm:block">Logout</span>
      </div>
    </div>
    <hr class="mt-2 sm:max-w-10" />
    <hr class="my-1 sm:max-w-20" />
    <hr class="mb-2 sm:max-w-32" />
    <!--à la une-->
    <div class="text-white hidden sm:block">
      <h1 class="p-1 und font-bold text-center">
        Son du jour: {{ store.state.laUne.name.substring(0, 11) }}
      </h1>
      <div class="w-44 m-1 h-52 cursor-pointer" @click="goToUne">
        <img :src="store.state.laUne.img" alt="" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
<script setup>
//import ChansonElement from "./Chanson.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { ref } from "vue";
const selectedPart = ref("accueil");
const store = useStore();
const router = useRouter();
const goToUne = () => {
  if (store.state.laUne.url != "") window.open(store.state.laUne.url, "_blank");
};
const logout = () => {
  store.commit("logout");
  router.push("/login");
};
</script>
