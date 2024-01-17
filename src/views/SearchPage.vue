<template>
  <main class="bg-black h-screen">
    <div class="flex justify-center">
      <SearchInputElement @search="search" class="w-11/12" />
    </div>
  </main>
</template>
<style scoped></style>
<script setup>
import SearchInputElement from "../components/SearchInput.vue";
</script>
