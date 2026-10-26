<script setup lang="ts">
import { reactive } from 'vue'
import type { Photo } from '../config/birthday'

defineProps<{ photos: Photo[] }>()

// เก็บรูปที่โหลดไม่ได้ เพื่อแสดงกรอบ placeholder แทน
const failed = reactive(new Set<string>())
const tilts = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1']
const isVideo = (src: string) => /\.(mp4|webm|ogg)(?:$|\?)/i.test(src)
</script>

<template>
  <section class="relative z-10 mt-16 w-full">
    <h2 class="text-center font-script text-5xl text-rose-500">Our Memories</h2>

    <div class="mx-auto mt-8 flex w-full max-w-3xl flex-wrap justify-center gap-5">
      <figure
        v-for="(p, i) in photos"
        :key="p.src"
        class="animate-fade-up w-[calc((100%-1.25rem)/2)] max-w-60 rounded-sm bg-white p-2 pb-3 shadow-lg transition hover:z-10 hover:scale-105 hover:rotate-0"
        :class="tilts[i % tilts.length]"
        :style="{ animationDelay: `${i * 150}ms` }"
      >
        <div class="aspect-square overflow-hidden bg-rose-50">
          <img
            v-if="!isVideo(p.src) && !failed.has(p.src)"
            :src="p.src"
            :alt="p.caption ?? ''"
            loading="lazy"
            class="size-full object-cover"
            @error="failed.add(p.src)"
          />
          <video
            v-else-if="isVideo(p.src) && !failed.has(p.src)"
            :src="p.src"
            :aria-label="p.caption ?? 'Memory video'"
            class="size-full object-cover"
            autoplay
            loop
            muted
            playsinline
            controls
            @error="failed.add(p.src)"
          />
          <div v-else class="flex size-full flex-col items-center justify-center gap-1 p-2 text-center text-xs text-rose-300">
            <span class="text-3xl">📷</span>
            <span class="break-all">{{ p.src }}</span>
          </div>
        </div>
        <figcaption v-if="p.caption" class="mt-2 text-center text-sm text-slate-600">{{ p.caption }}</figcaption>
      </figure>
    </div>
  </section>
</template>
