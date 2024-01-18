<template>
  <div>
    <!--side bar-->
    <div
      v-if="store.state.accessToken != ''"
      class="md:min-w-44 min-w-10 h-full bg-black fixed border-r-2 border-white"
    >
      <SideBar />
    </div>
    <!--main content-->
    <router-view
      :style="{
        paddingLeft: store.state.accessToken != '' ? '5%' : '0',
      }"
      :class="{
        'ml-16 md:ml-36': store.state.accessToken != '',
        'ml-0': store.state.accessToken == '',
        'p-2   ': true,
      }"
    />
  </div>
</template>
<style scoped></style>
<script setup>
//import section
import SideBar from "./components/SideBar.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
//initialisation section
const router = useRouter();
const store = useStore();
//fonction executé au montage
onMounted(async () => {
  try {
    //on récupère le token dans le local storage
    const accessToken = localStorage.getItem("accessToken");
    //on le stocke dans le store
    store.commit("setAccessToken", accessToken);
    //on essaye de récupérer le profile, si erreur on catch(token invalide)
    await store.dispatch("getProfile");
    // await store.dispatch("getDefaultSongs");
    // await store.dispatch("getDefaultAlbums");
    // await store.dispatch("getDefaultArtists");
    //si le token est valide, on redirige vers la page home
    // router.push("/home");
  } catch (error) {
    //si le token est invalide, on redirige vers la page login
    //on vide le store et le local storage(pour cacher la side bar)
    store.commit("setAccessToken", "");
    localStorage.clear();
    console.log("token invalide", error);
    router.push("/login");
  }
});
</script>
