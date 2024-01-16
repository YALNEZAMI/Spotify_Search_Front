<template>
  <main>
    <input
      v-model="searchInput"
      type="text"
      class="rounded p-2 border-2 border-white w-full bg-gray-700"
      placeholder="Baby shark..."
    />
  </main>
</template>
<style scoped></style>
<script setup>
import { ref, defineEmits, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const emits = defineEmits(["search"]);

const store = useStore();
const router = useRouter();
const searchInput = ref("");
watch(searchInput, () => {
  emits("search", searchInput.value);
});
</script>
