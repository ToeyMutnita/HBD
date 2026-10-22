<script setup lang="ts">
import BloomingFlower from './BloomingFlower.vue'

interface FlowerSpec {
  color: string
  center?: string
  petals?: number
  height: number
  delay: number
}

const left: FlowerSpec[] = [
  { color: '#f472b6', height: 200, delay: 0 },
  { color: '#fb7185', petals: 6, height: 150, delay: 300 },
  { color: '#c084fc', center: '#fef3c7', petals: 10, height: 230, delay: 600 },
]
const right: FlowerSpec[] = [
  { color: '#fda4af', petals: 10, height: 220, delay: 450 },
  { color: '#f9a8d4', petals: 6, height: 160, delay: 150 },
  { color: '#fbbf24', center: '#fb923c', height: 190, delay: 750 },
]
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 bottom-0 z-0 flex justify-between" aria-hidden="true">
    <div class="flex origin-bottom-left scale-75 items-end -space-x-6 sm:scale-100 short:scale-60">
      <BloomingFlower v-for="(f, i) in left" :key="i" v-bind="f" />
    </div>
    <div class="flex origin-bottom-right scale-75 items-end -space-x-6 sm:scale-100 short:scale-60">
      <BloomingFlower v-for="(f, i) in right" :key="i" v-bind="f" />
    </div>
  </div>
</template>
