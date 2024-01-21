<template>
  <div>
    <!--side bar-->
    <div
      class="md:min-w-44 min-w-10 h-full bg-black fixed border-r-2 border-white z-20"
    >
      <SideBar />
    </div>
    <!--main content-->
    <router-view
      :class="{
        'p-2 pl-6 sm:pl-4  ml-14 sm:ml-44   ': true,
      }"
    />
  </div>
</template>
<style scoped></style>
<script setup>
//import section
import SideBar from "../components/SideBar.vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
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

    //si le token est valide, on redirige vers la page home
    router.push("/admin/home");
  } catch (error) {
    console.log("catch");
    //si le token est invalide, on redirige vers la page login
    //on vide le store et le local storage(pour cacher la side bar)
    // store.commit("setAccessToken", "");
    // localStorage.clear();
    router.push("/login");
  }
});
</script>
