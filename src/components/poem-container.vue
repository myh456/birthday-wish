<template>
  <div class="poem-container" v-if="sentences && sentences.length">
    <div
      class="poem-wrapper"
      :class="{ 'horizontal-mode': direction === 'horizontal' }"
      :key="direction"
    >
      <div
        v-for="(verse, verseIndex) in sentences"
        :key="verseIndex"
        class="verse-column"
        :class="[
          direction === 'vertical' && verseIndex % 2 === 1 ? 'even-verse' : '',
          direction === 'horizontal' ? 'horizontal-mode' : '',
        ]"
        :style="{
          fontSize: size + 'px',
        }"
      >
        <span
          v-for="(char, charIndex) in verse.split('')"
          :key="`${verseIndex}-${charIndex}`"
          class="char"
          :style="{
            animationDelay: getDelay(verseIndex, charIndex),
            backgroundImage: `linear-gradient(
            to bottom,
            ${material.light} 0%,
            ${material.base} 20%,
            ${material.dark} 45%,
            ${material.highlight} 55%,
            ${material.base} 75%,
            ${material.deepDark} 100%
          )`,
          }"
        >
          {{ char === " " ? "\u00A0" : char }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from "vue";
interface RGB {
  r: number;
  g: number;
  b: number;
}
interface HSL {
  h: number;
  s: number;
  l: number;
}

// 组件属性
const props = defineProps({
  sentences: {
    type: Array as PropType<string[]>,
    default: () => [],
    required: false,
  },
  direction: {
    type: String as PropType<"vertical" | "horizontal">,
    default: "vertical",
    validator: (val: string) => ["vertical", "horizontal"].includes(val),
  },
  size: {
    type: Number,
    default: 34,
  },
  color: {
    type: String,
    default: "#000000",
  },
});

// 可调节的延迟参数（单位：秒）
const INTER_VERSE_DELAY = 2; // 每句之间的起始延迟
const INTER_CHAR_DELAY = 0.2; // 每个字之间的延迟

/**
 * 计算每个字符的 animation-delay
 * @param verseIndex 诗句索引（0-based）
 * @param charIndex  字符在句中的索引（0-based）
 * @returns CSS 延迟值
 */
function getDelay(verseIndex: number, charIndex: number): string {
  const delay = verseIndex * INTER_VERSE_DELAY + charIndex * INTER_CHAR_DELAY;
  return `${delay + 1}s`;
}

/**
 * 解析 rgb 字符串
 */
function parseRgb(hex: string): RGB {
  let value = hex.replace(new RegExp("^#"), "").trim();

  // 兼容简写形式 '#abc' -> '#aabbcc'
  if (value.length === 3) {
    value = value
      .split("")
      .map((c) => c + c)
      .join("");
  }

  // 校验格式
  if (!new RegExp("^[0-9a-fA-F]{6}$").test(value)) {
    throw new Error(`无效的颜色值: ${hex}`);
  }

  const num = parseInt(value, 16);

  return {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff,
  };
}

/**
 * RGB -> HSL
 */
function rgbToHsl({ r, g, b }: RGB): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;

  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  };
}

/**
 * HSL -> CSS hsl()
 */
function hsl(h: number, s: number, l: number): string {
  return `hsl(${h} ${s}% ${l}%)`;
}

/**
 * 修改 HSL 的明度
 */
function adjustLightness(color: HSL, amount: number): string {
  const lightness = Math.max(0, Math.min(100, color.l + amount));

  return hsl(color.h, color.s, lightness);
}

/**
 * 根据基础颜色生成金属渐变
 */
const material = computed(() => {
  const rgb = parseRgb(props.color);
  const base = rgbToHsl(rgb);

  return {
    light: adjustLightness(base, 30), // 顶部高光
    base: adjustLightness(base, 0), // 基础颜色
    dark: adjustLightness(base, -25), // 第一段暗部
    highlight: adjustLightness(base, 40), // 中间强高光
    deepDark: adjustLightness(base, -35), // 深色
  };
});
</script>

<style scoped>
* {
  font-weight: 900;

  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  filter: drop-shadow(0 3px 2px rgba(0, 0, 0, 0.35));
}

.poem-container {
  display: inline-block;
  padding: 20px;
  border-radius: 20px;
}

/* ---------- 默认垂直模式（从右向左，每列从上到下） ---------- */
.poem-wrapper {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.verse-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.4;
  letter-spacing: 0.04em;
  padding: 4px 0;
  transition: transform 0.3s ease;
}

/* 偶数句在垂直模式下向下偏移 */
.even-verse {
  transform: translateY(40px);
}

/* ---------- 横向模式（从上到下，每句从左到右） ---------- */
.poem-wrapper.horizontal-mode {
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;
}

.verse-column.horizontal-mode {
  flex-direction: row;
  align-items: center;
  gap: 6px; /* 字间水平间距 */
  transform: none !important; /* 强制取消偏移 */
}

/* ---------- 每个字符的样式 ---------- */
.char {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.6em; /* 根据父级 font-size 自适应 */
  height: 1.8em;
  border-radius: 6px;
  opacity: 0;
  animation: fadeIn 0.45s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.92) translateY(6px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* ---------- 响应式适配 ---------- */
@media (max-width: 500px) {
  .poem-wrapper {
    gap: 20px;
  }
  .verse-column {
    font-size: 22px;
  }
  .char {
    width: 1.6em;
    height: 1.8em;
  }
  .even-verse {
    transform: translateY(16px);
  }
  .poem-wrapper.horizontal-mode {
    gap: 8px;
  }
  .verse-column.horizontal-mode {
    gap: 4px;
  }
}

@media (max-width: 380px) {
  .verse-column {
    font-size: 18px;
  }
  .even-verse {
    transform: translateY(12px);
  }
  .poem-wrapper.horizontal-mode {
    gap: 6px;
  }
  .verse-column.horizontal-mode {
    gap: 3px;
  }
}
</style>