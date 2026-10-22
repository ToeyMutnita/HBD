<script setup lang="ts">
const symbols = ['🌸', '💖', '🌷', '✨', '💕']

const items = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  char: symbols[i % symbols.length],
  left: Math.random() * 100,
  size: 14 + Math.random() * 16,
  duration: 7 + Math.random() * 7,
  // ดีเลย์ติดลบ = เริ่มกลางทาง ไม่ต้องรอร่วงจากบนสุดพร้อมกัน
  delay: -Math.random() * 14,
  drift: (Math.random() - 0.5) * 120,
}))
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    <span
      v-for="p in items"
      :key="p.id"
      class="petal absolute -top-10"
      :style="{
        left: `${p.left}%`,
        fontSize: `${p.size}px`,
        animationDuration: `${p.duration}s`,
        animationDelay: `${p.delay}s`,
        '--drift': `${p.drift}px`,
      }"
      >{{ p.char }}</span
    >
  </div>
</template>

<style scoped>
.petal {
  opacity: 0.8;
  animation: fall linear infinite;
}

@keyframes fall {
  from { translate: 0 0; rotate: 0deg; }
  to { translate: var(--drift) 110vh; rotate: 360deg; }
}
</style>
