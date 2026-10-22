<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ to: string }>()
const emit = defineEmits<{
  /** กดเปิดซอง (ใช้เริ่มเพลง เพราะ browser ต้องการ user gesture) */
  open: []
  /** แอนิเมชันเปิดซองจบแล้ว */
  opened: []
}>()

const isOpen = ref(false)

function open() {
  if (isOpen.value) return
  isOpen.value = true
  emit('open')
  setTimeout(() => emit('opened'), 2400)
}
</script>

<template>
  <div class="flex flex-col items-center gap-10">
    <p class="animate-float font-script text-4xl text-rose-500">
      {{ isOpen ? 'Surprise!' : 'You have a letter 💌' }}
    </p>

    <button
      type="button"
      class="envelope relative h-52 w-80 cursor-pointer focus:outline-none"
      :class="{ 'is-open': isOpen }"
      aria-label="เปิดซองจดหมาย"
      @click="open"
    >
      <!-- ด้านหลังซอง -->
      <div class="absolute inset-0 rounded-lg bg-rose-400 shadow-2xl" />

      <!-- จดหมายด้านใน -->
      <div class="letter absolute inset-x-5 top-3 bottom-3 z-10 rounded-md bg-white p-4 text-center shadow-md">
        <p class="font-script text-3xl text-rose-500">For you</p>
        <p class="mt-2 text-sm text-slate-500">{{ to }}</p>
        <p class="mt-3 text-3xl">🎂</p>
      </div>

      <!-- กระเป๋าหน้าซอง -->
      <div class="pocket absolute inset-0 z-20 rounded-lg bg-rose-300" />

      <!-- ฝาซอง -->
      <div class="flap absolute inset-x-0 top-0 z-30 h-[58%] rounded-t-lg bg-rose-400" />

      <!-- ตราประทับ -->
      <div class="seal z-40 grid size-12 place-items-center rounded-full bg-red-500 text-xl text-white shadow-lg">
        ❤
      </div>
    </button>

    <p class="text-sm text-rose-400" :class="{ invisible: isOpen }">แตะที่ซองเพื่อเปิด</p>
  </div>
</template>

<style scoped>
.envelope {
  perspective: 1000px;
}

.pocket {
  clip-path: polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%);
}

.flap {
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top;
  transition: transform 0.6s ease, z-index 0s 0.3s;
}
.is-open .flap {
  transform: rotateX(180deg);
  z-index: 0;
}

.letter {
  transition: transform 0.9s ease 0.6s;
}
.is-open .letter {
  transform: translateY(-55%);
}

.seal {
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s, transform 0.3s;
}
.is-open .seal {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
}
</style>
