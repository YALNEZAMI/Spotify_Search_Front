<template>
  <div>
    <!--side bar-->
    <div
      v-if="store.state.accessToken != ''"
      class="min-w-44 h-full bg-black fixed border-r-2 border-white"
    >
      <SideBar />
    </div>
    <!--main content-->
    <router-view
      :class="{
        'ml-44': store.state.accessToken != '',
        'ml-0': store.state.accessToken == '',
        'p-2': true,
      }"
    />
  </div>
</template>
<style scoped></style>
<script setup>
import SideBar from "./components/SideBar.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
const router = useRouter();
const store = useStore();
onMounted(async () => {
  try {
    //check if the accessToken is valid
    const accessToken = localStorage.getItem("accessToken");
    store.commit("setAccessToken", accessToken);
    //set profile in the store
    await store.dispatch("getProfile");
    router.push("/home");
  } catch (error) {
    //if accessToken not valid=>clear the localStorage,and redirect to login page
    //set the accessToken to empty string in the store to hide the side bar
    store.commit("setAccessToken", "");
    localStorage.clear();
    router.push("/login");
  }
});
</script>
