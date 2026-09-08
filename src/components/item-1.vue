<template>
  <div id="page" ref="pageRef">
    <Transition>
      <img
        v-if="!ordered"
        class="sweet-dream"
        :src="sweetDream"
        alt="美梦"
        @click="expandCircle"
      />
    </Transition>
    <Transition>
      <img
        v-if="order && !ordered"
        class="xiao-give"
        :src="xiaoGive"
        alt="送出美梦的魈"
      />
    </Transition>
    <Transition>
      <img
        v-if="ordered && !out"
        class="sweet-dream-meal"
        :src="sweetDream"
        alt="未享用的美梦"
      />
    </Transition>
    <Transition>
      <img
        v-if="out"
        class="sweet-dream-eaten"
        :src="sweetDreamEaten"
        alt="已享用的美梦"
      />
    </Transition>
    <Transition>
      <img
        v-if="ordered && !out"
        class="xiao-lean"
        :src="xiaoLean"
        alt="倚墙休息的魈"
      />
    </Transition>
    <Transition>
      <img
        v-if="ordered && !out"
        class="xiao-lean"
        :src="xiaoLean"
        alt="倚墙休息的魈"
      />
    </Transition>
    <Transition>
      <div v-if="canNext && !out" class="next" @click="toNext"></div>
    </Transition>
    <PoemContainer
      v-if="ordered && !out"
      ref="poemRef"
      class="poem"
      color="#ffffff"
      :sentences="[
        '琼脂凝作玉生烟',
        '一勺甘甜一梦牵',
        '莫道千山霜月冷',
        '今宵共我庆华年',
      ]"
    />
    <PoemContainer
      v-if="out && isActive"
      ref="poemRef"
      class="title"
      color="#ffffff"
      direction="horizontal"
      :size="100"
      :sentences="['生日快乐']"
    />
  </div>
</template>

<script lang="ts" setup>
import sweetDream from "@/assets/item/sweet-dream.png";
import sweetDreamEaten from "@/assets/item/sweet-dream-eaten.png";
import xiaoGive from "@/assets/character/xiao-give.png";
import xiaoLean from "@/assets/character/xiao-lean.png";
import PoemContainer from "./poem-container.vue";
import { onMounted, ref, watch } from "vue";

const pageRef = ref();
const hasShown = ref<boolean>(false); // 是否初次展示
const expanded = ref<boolean>(false); // 是否聚焦
const order = ref<boolean>(false); // 是否开始上菜
const ordered = ref<boolean>(false); // 是否完成上菜
const out = ref<boolean>(false); // 是否已出门
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
  if (props.isActive && !hasShown.value) {
    hasShown.value = true;
  } else if (hasShown.value && !out.value) {
    out.value = true;
  }
};

const expandCircle = () => {
  if (expanded.value) return;
  expanded.value = true;
  pageRef.value.classList.add("expanded");
  order.value = true;
  setTimeout(() => {
    ordered.value = true;
  }, 2000);
  setTimeout(() => {
    canNext.value = true;
  }, 11000);
};

const toNext = () => {
  emit("to-next");
};

onMounted(() => init());
</script>

<style scoped>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden; /* 动画播放期间禁止滚动 */
}

#page {
  position: relative;
  background-image: url("@/assets/background/house.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  /* 初始裁剪 */
  clip-path: circle(150px at 50% 50%);
  -webkit-clip-path: circle(150px at 50% 50%);
  transition: clip-path 1s cubic-bezier(0.65, 0, 0.35, 1);
}

#page.expanded {
  /* 150% 足够覆盖任意屏幕对角线 */
  clip-path: circle(150% at 50% 50%);
  -webkit-clip-path: circle(150% at 50% 50%);
}

.sweet-dream {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 15vw;
  object-fit: cover;
  cursor: pointer;
  pointer-events: auto;
  animation: floatUpDown 2s ease-in-out infinite;
}

.sweet-dream-meal,
.sweet-dream-eaten {
  position: absolute;
  width: 10vw;
  left: 22%;
  top: 70%;
  transform: scaleY(0.7) rotate(-8deg);
}

.xiao-give {
  position: absolute;
  width: 45vw;
  left: 15%;
  top: 18%;
}

.xiao-lean {
  position: absolute;
  width: 32vw;
  right: 3%;
  bottom: 12%;
}

.poem {
  position: absolute;
  left: 10vw;
  top: 5vh;
}

.title {
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
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