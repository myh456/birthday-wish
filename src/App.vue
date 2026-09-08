<template>
  <RouterView v-loading="isLoading" />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import { preloadImages } from "@/utils/preload";

// 定义需要预加载的图片列表
const imageUrls = [
  "src/assets/background/house.jpg",
  "src/assets/background/moon.jpg",
  "src/assets/background/theatre.jpg",
  "src/assets/character/xiao-gaze.png",
  "src/assets/character/xiao-give.png",
  "src/assets/character/xiao-lay.png",
  "src/assets/character/xiao-lean.png",
  "src/assets/character/xiao-sitting.png",
  "src/assets/character/yunjin.png",
  "src/assets/item/lantern.png",
  "src/assets/item/sweet-dream-eaten.png",
  "src/assets/item/sweet-dream.png",
];

const isLoading = ref(true);

onMounted(async () => {
  try {
    // 开始预加载所有图片
    await preloadImages(imageUrls);
    console.log("所有图片预加载完成");
  } catch (error) {
    console.error("图片预加载失败", error);
  } finally {
    isLoading.value = false; // 加载完成，隐藏loading遮罩
  }
});
</script>