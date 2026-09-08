<template>
  <el-carousel
    ref="carouselRef"
    direction="vertical"
    motion-blur
    trigger="click"
    :autoplay="false"
    :loop="false"
    style="height: 100vh"
    @change="changeIndex"
  >
    <el-carousel-item>
      <item1 :is-active="currentIndex === 0" @to-next="toNext" />
    </el-carousel-item>
    <el-carousel-item>
      <item2 :is-active="currentIndex === 1" @to-next="toNext" />
    </el-carousel-item>
    <el-carousel-item>
      <item3 :is-active="currentIndex === 2" @to-next="toNext" />
    </el-carousel-item>
    <el-carousel-item>
      <item4 :is-active="currentIndex === 3" @to-next="toNext" />
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts" name="main" setup>
import Item1 from "@/components/item-1.vue";
import Item2 from "@/components/item-2.vue";
import Item3 from "@/components/item-3.vue";
import Item4 from "@/components/item-4.vue";
import { ref } from "vue";

const currentIndex = ref<number>(0);
const carouselRef = ref();

const changeIndex = (val: number) => {
  currentIndex.value = val;
};

const toNext = () => {
  carouselRef.value.setActiveItem((currentIndex.value + 1) % 4);
};
</script>

<style scoped>
.el-carousel,
.el-carousel__container,
.el-carousel__item {
  height: 100vh;
}

.el-carousel__item {
  background-color: var(--main-rock);
}

::v-deep .el-carousel__indicators--right {
  left: 96vw;
}

::v-deep .el-carousel__button {
  box-sizing: content-box;
  width: 10px;
  height: 10px;
  margin: 10px;
  transform: rotate(45deg);
  background-color: var(--main-rock);
  transition: all;
}

::v-deep .el-carousel__indicator.is-active .el-carousel__button {
  width: 6px;
  height: 6px;
  border: 7px solid var(--main-wind);
  margin: 5px;
  background-color: transparent;
}
</style>