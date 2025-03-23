<template>
  <main>
    <div class="relative">
      <input
        v-model="searchInput"
        type="text"
        class="rounded p-2 border-2 text-white border-white w-full bg-gray-700 focus:bg-gray-500 transition-all duration-300"
        placeholder="Baby shark..."
      />
      <svg
        :style="{
          position: 'absolute',
          top: '20px',
          right: '10px',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }"
        @click="searchInput = ''"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
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
  store.commit("setSearchKey", searchInput.value);
  emits("search", searchInput.value);
});
</script>
