<template>
  <RouterView v-loading="isLoading" />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import { preloadImages, IMAGE_URLS } from "@/utils/preload";

const isLoading = ref(true);

onMounted(async () => {
  try {
    await preloadImages(IMAGE_URLS);
  } catch (error) {
    console.error("图片预加载失败", error);
  } finally {
    isLoading.value = false;
  }
});
</script>