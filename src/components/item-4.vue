<template>
  <div
    id="page"
    ref="pageRef"
    :style="{ backgroundImage: `url(${IMAGE_URLS.moon})` }"
  >
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
        '金鹏振翼越重天',
        '璃月山河几变迁',
        '不羡长生空久岁',
        '惟祈君娟似婵娟',
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
import { IMAGE_URLS } from "@/utils/preload";
import PoemContainer from "./poem-container.vue";
import { onMounted, ref, watch } from "vue";

const pageRef = ref();
const fly = ref<boolean>(false);
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
    setTimeout(() => {
      pageRef.value.classList = ["expand"];
    }, 500);
    setTimeout(() => {
      fly.value = true;
    }, 2000);
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
  transition: all 1s ease-in-out;
}

#page.expand {
  height: 200vh;
  width: 200vw;
}

.lantern-fly {
  position: absolute;
  width: 8vw;
  left: 65vw;
  top: 40vh;
  transform: rotate(12deg);
}

.poem {
  position: absolute;
  left: 2%;
  top: 15%;
}

.next {
  width: 1px;
  height: 1px;
  box-sizing: content-box;
  border: 50px solid transparent;
  border-bottom: 30px solid var(--main-wind);
  position: absolute;
  top: 40%;
  left: 40%;
  transform: translateX(-50%);
  animation: floatSmoothly 2s ease-in-out infinite;
}

@keyframes floatSmoothly {
  0% {
    top: 40%;
  }
  50% {
    top: calc(40% - 15px);
  }
  100% {
    top: 40%;
  }
}
</style>