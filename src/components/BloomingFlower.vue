<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string
    center?: string
    petals?: number
    /** ดีเลย์ก่อนเริ่มบาน (ms) */
    delay?: number
    /** ความสูงของดอก (px) */
    height?: number
  }>(),
  { color: '#f472b6', center: '#fde68a', petals: 8, delay: 0, height: 180 },
)
</script>

<template>
  <svg
    :width="height / 2"
    :height="height"
    viewBox="0 0 100 200"
    class="overflow-visible"
    :style="{ '--d': `${delay}ms` }"
  >
    <path
      class="stem"
      d="M50 200 C 44 160, 58 120, 50 70"
      fill="none"
      stroke="#4ade80"
      stroke-width="4"
      stroke-linecap="round"
    />
    <g class="leaf" style="transform-origin: 50px 145px">
      <ellipse cx="36" cy="140" rx="14" ry="6" fill="#22c55e" transform="rotate(-30 36 140)" />
    </g>
    <g class="leaf" style="transform-origin: 52px 125px">
      <ellipse cx="64" cy="120" rx="14" ry="6" fill="#22c55e" transform="rotate(30 64 120)" />
    </g>
    <g class="head">
      <ellipse
        v-for="i in petals"
        :key="i"
        cx="50"
        cy="48"
        rx="11"
        ry="22"
        :fill="color"
        opacity="0.9"
        :transform="`rotate(${(360 / petals) * i} 50 70)`"
      />
      <circle cx="50" cy="70" r="10" :fill="center" />
    </g>
  </svg>
</template>

<style scoped>
.stem {
  stroke-dasharray: 160;
  stroke-dashoffset: 160;
  animation: grow 1.2s ease-out var(--d) forwards;
}
.leaf {
  scale: 0;
  animation: pop 0.5s ease-out calc(var(--d) + 700ms) forwards;
}
.head {
  transform-origin: 50px 70px;
  scale: 0;
  animation: bloom 1s cubic-bezier(0.3, 1.6, 0.5, 1) calc(var(--d) + 1000ms) forwards;
}

@keyframes grow {
  to { stroke-dashoffset: 0; }
}
@keyframes pop {
  to { scale: 1; }
}
@keyframes bloom {
  from { scale: 0; rotate: -90deg; }
  to { scale: 1; rotate: 0deg; }
}
</style>
