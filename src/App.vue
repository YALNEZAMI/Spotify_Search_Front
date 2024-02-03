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
});
</script>
