<template>
  <RouterView
    v-loading="isLoading"
    element-loading-background="#ffffff"
    element-loading-svg="<svg t='1788921951704' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2741' width='50' height='50'><path d='M512 0c282.8 0 512 229.2 512 512 0 49.5-40.1 89.6-89.6 89.6-48.5 0-87.9-38.5-89.5-86.5l-0.1-3.1c0-183.8-149-332.8-332.8-332.8S179.2 328.2 179.2 512c0 182 146 329.8 327.3 332.8h5.5c49.5 0 89.6 40.1 89.6 89.6 0 49.5-40.1 89.6-89.6 89.6C229.2 1024 0 794.8 0 512S229.2 0 512 0z' p-id='2742' fill='#bfbfbf'></path></svg>"
  />
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
