<template>
  <div
    id="page"
    ref="pageRef"
    :style="{ backgroundImage: `url(${IMAGE_URLS.moon})` }"
  >
    <Transition>
      <img
        v-if="ready"
        class="xiao-gaze"
        :src="IMAGE_URLS.xiaoGaze"
        alt="回望的魈"
      />
    </Transition>
    <Transition>
      <img
        v-if="fin"
        class="xiao-lay"
        :src="IMAGE_URLS.xiaoLay"
        alt="仰望的魈"
      />
    </Transition>
    <Transition>
      <img
        v-if="ready"
        class="lantern"
        :src="IMAGE_URLS.lantern"
        alt="霄灯"
        @click="flyLantern"
      />
    </Transition>
    <Transition>
      <img
        v-if="fly"
        class="lantern-fly"
        :src="IMAGE_URLS.lantern"
        alt="升空的霄灯"
      />
    </Transition>
    <Transition>
      <div v-if="canNext" class="next" @click="toNext"></div>
    </Transition>
    <PoemContainer
      v-if="fly"
      ref="poemRef"
      class="poem"
      color="#ffffff"
      :sentences="[
        '荻花如雪月如钩',
        '共放明灯照九秋',
        '昔日独行诛邪祟',
        '今宵许愿为君留',
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
import { IMAGE_URLS } from "@/utils/preload";
import PoemContainer from "./poem-container.vue";
import { onMounted, ref, watch } from "vue";

const ready = ref<boolean>(false);
const fly = ref<boolean>(false);
const fin = ref<boolean>(false);
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
  if (props.isActive && !ready.value) {
    ready.value = true;
  }
};

const flyLantern = () => {
  if (ready.value) {
    ready.value = false;
    fin.value = true;
    setTimeout(() => {
      fly.value = true;
    }, 1000);
    setTimeout(() => {
      canNext.value = true;
    }, 11000);
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

.xiao-gaze {
  position: absolute;
  width: 18vw;
  left: 50vw;
  bottom: 0;
}

.xiao-lay {
  position: absolute;
  width: 18vw;
  right: 25vw;
  bottom: 3vh;
}

.lantern {
  position: absolute;
  width: 10vw;
  left: 30%;
  bottom: 2%;
  transform: translateX(-50%);
  animation: floatSmoothly 2s ease-in-out infinite;
}

.lantern-fly {
  position: absolute;
  width: 5vw;
  left: 40vw;
  top: 25vh;
  transform: rotate(12deg);
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

@keyframes floatUpDown {
  0% {
    margin-top: -15px;
  }
  50% {
    margin-top: 15px;
  }
  100% {
    margin-top: -15px;
  }
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