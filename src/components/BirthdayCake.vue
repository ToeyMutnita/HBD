<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{ candles?: number }>(), { candles: 3 })
const emit = defineEmits<{ blown: [] }>()

const blown = ref(false)

const drips = [22, 30, 18, 34, 24, 28, 20]
const sprinkles = [
  { left: 15, top: 55, color: 'bg-yellow-300' },
  { left: 32, top: 70, color: 'bg-sky-300' },
  { left: 50, top: 50, color: 'bg-white' },
  { left: 68, top: 72, color: 'bg-lime-300' },
  { left: 84, top: 56, color: 'bg-yellow-300' },
]

function blow() {
  if (blown.value) return
  blown.value = true
  emit('blown')
}
</script>

<template>
  <div class="animate-rise flex flex-col items-center">
    <div class="relative mt-20 flex cursor-pointer flex-col items-center" @click="blow">
      <!-- เทียน -->
      <div class="absolute -top-16 z-10 flex gap-5">
        <div v-for="n in candles" :key="n" class="relative flex flex-col items-center">
          <span class="flame" :class="{ out: blown }" />
          <span v-if="blown" class="smoke" />
          <span class="candle h-12 w-3 rounded-sm" />
        </div>
      </div>

      <!-- ชั้นบน -->
      <div class="relative h-20 w-44 rounded-t-2xl bg-pink-300">
        <div class="absolute inset-x-0 top-0 h-4 rounded-t-2xl bg-white" />
        <div class="absolute inset-x-1 top-0 flex justify-around">
          <span v-for="(h, i) in drips" :key="i" class="w-4 rounded-b-full bg-white" :style="{ height: `${h}px` }" />
        </div>
        <span
          v-for="(s, i) in sprinkles"
          :key="i"
          class="absolute h-1.5 w-3 rotate-45 rounded-full"
          :class="s.color"
          :style="{ left: `${s.left}%`, top: `${s.top}%` }"
        />
      </div>

      <!-- ชั้นล่าง -->
      <div class="relative h-24 w-64 rounded-t-2xl bg-rose-400">
        <div class="absolute inset-x-0 top-0 h-4 rounded-t-2xl bg-pink-100" />
        <div class="absolute inset-x-1 top-0 flex justify-around">
          <span v-for="(h, i) in [...drips, 26, 18]" :key="i" class="w-5 rounded-b-full bg-pink-100" :style="{ height: `${h}px` }" />
        </div>
        <p class="absolute inset-x-0 bottom-3 text-center font-script text-3xl text-white drop-shadow">
          Happy Birthday
        </p>
      </div>

      <!-- จาน -->
      <div class="h-4 w-80 rounded-full bg-white shadow-lg" />
    </div>

    <button
      type="button"
      class="mt-8 rounded-full bg-white/80 px-6 py-3 text-rose-500 shadow-md transition hover:scale-105 disabled:hover:scale-100"
      :disabled="blown"
      @click="blow"
    >
      {{ blown ? 'ขอให้คำอธิษฐานเป็นจริงนะ ✨' : '🕯️ อธิษฐาน แล้วแตะเพื่อเป่าเทียน' }}
    </button>
  </div>
</template>

<style scoped>
.candle {
  background: repeating-linear-gradient(45deg, #fff 0 6px, #f9a8d4 6px 12px);
}

.flame {
  width: 14px;
  height: 22px;
  margin-bottom: 2px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  background: radial-gradient(circle at 50% 70%, #fff7ae 0 25%, #fbbf24 45%, #f97316 80%);
  box-shadow: 0 0 14px 5px rgb(251 191 36 / 0.6);
  transform-origin: 50% 100%;
  animation: flicker 0.15s ease-in-out infinite alternate;
  transition: opacity 0.4s, scale 0.4s;
}
.flame.out {
  opacity: 0;
  scale: 0;
  animation: none;
}

.smoke {
  position: absolute;
  top: 4px;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: rgb(148 163 184 / 0.6);
  animation: smoke 1.6s ease-out forwards;
}

@keyframes flicker {
  from { transform: rotate(-3deg) scaleY(1); }
  to { transform: rotate(3deg) scaleY(1.1); }
}
@keyframes smoke {
  to { translate: 0 -48px; scale: 3; opacity: 0; }
}
</style>
