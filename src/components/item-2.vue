<template>
  <div
    id="page"
    ref="pageRef"
    :style="{ backgroundImage: `url(${IMAGE_URLS.theatre})` }"
  >
    <Transition>
      <img v-if="singing" class="yunjin" :src="IMAGE_URLS.yunjin" alt="云堇" />
    </Transition>
    <Transition>
      <img
        v-if="watching"
        class="xiao"
        :src="IMAGE_URLS.xiaoSitting"
        alt="坐在围墙上的魈"
      />
    </Transition>
    <Transition>
      <div v-if="canNext" class="next" @click="toNext"></div>
    </Transition>
    <PoemContainer
      v-if="watching"
      ref="poemRef"
      class="poem"
      color="#ffffff"
      :sentences="[
        '红牙声断水云乡',
        '袖底风回百转肠',
        '演尽浮生千万相',
        '不如座侧一炉香',
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
import { IMAGE_URLS } from "@/utils/preload";
import PoemContainer from "./poem-container.vue";
import { onMounted, ref, watch } from "vue";

const hasShown = ref<boolean>(false); // 是否初次展示
const singing = ref<boolean>(false);
const watching = ref<boolean>(false);
const canNext = ref<boolean>(false);
const emit = defineEmits(["to-next"]);
const props = defineProps<{
  isActive: boolean;
}>();

watch(
  () => props.isActive,
  () => init()
);

const init = () => {
  if (props.isActive) {
    if (!hasShown.value) {
      hasShown.value = true;
      setTimeout(() => {
        singing.value = true;
      }, 1000);
      setTimeout(() => {
        watching.value = true;
      }, 2000);
      setTimeout(() => {
        canNext.value = true;
      }, 11000);
    }
  }
};

const toNext = () => {
  emit("to-next");
};

onMounted(() => init());
</script>

<style scoped>
#page {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.yunjin {
  position: absolute;
  width: 11vw;
  right: 13%;
  bottom: 45%;
  transform: rotate(5deg);
}

.xiao {
  position: absolute;
  width: 12vw;
  left: 14%;
  top: 16%;
  transform: rotate(-8deg);
}

.poem {
  position: absolute;
  left: 10%;
  bottom: 10%;
}

.next {
  width: 1px;
  height: 1px;
  box-sizing: content-box;
  border: 50px solid transparent;
  border-top: 30px solid var(--main-wind);
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  animation: floatSmoothly 2s ease-in-out infinite;
}

@keyframes floatSmoothly {
  0% {
    bottom: calc(2%);
  }
  50% {
    bottom: calc(2% - 15px);
  }
  100% {
    bottom: calc(2%);
  }
}
</style>