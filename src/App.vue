<template>
  <router-view />
</template>
<style scoped></style>
<script setup>
import { useStore } from "vuex";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

onMounted(async () => {
  setTimeout(() => {
    if (store.state.accessToken === "") {
      router.push("/login");
    }
  }, 1000);
  //set the hasAccount state to false if the user is null
  if (!store.state.profile) {
    store.commit("setHasAccount", false);
  }
});
</script>
