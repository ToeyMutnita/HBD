<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { birthday } from './config/birthday'
import EnvelopeLetter from './components/EnvelopeLetter.vue'
import BirthdayCake from './components/BirthdayCake.vue'
import WishMessage from './components/WishMessage.vue'
import PhotoGallery from './components/PhotoGallery.vue'
import FlowerBouquet from './components/FlowerBouquet.vue'
import FallingPetals from './components/FallingPetals.vue'
import RotateDevice from './components/RotateDevice.vue'

/** envelope → เปิดซอง, cake → เค้กลอยขึ้นมา, celebrate → คำอวยพร + รูป + ดอกไม้ */
type Stage = 'envelope' | 'cake' | 'celebrate'

const stage = ref<Stage>('envelope')
const audio = ref<HTMLAudioElement | null>(null)
const wishAnchor = ref<HTMLElement | null>(null)

function playMusic() {
  const player = audio.value
  if (!player) return

  player.play().catch(() => {
    // เบราว์เซอร์อาจบล็อก autoplay จนกว่าจะมีการแตะหรือคลิกหน้าเว็บ
  })
}

function startMusicAfterInteraction() {
  playMusic()
  document.removeEventListener('pointerdown', startMusicAfterInteraction)
  document.removeEventListener('keydown', startMusicAfterInteraction)
}

onMounted(() => {
  // พยายามเล่นทันทีเมื่อโหลดหน้าเว็บ
  playMusic()
  // สำรองกรณีเบราว์เซอร์บล็อก autoplay ที่มีเสียง
  document.addEventListener('pointerdown', startMusicAfterInteraction, { once: true })
  document.addEventListener('keydown', startMusicAfterInteraction, { once: true })
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', startMusicAfterInteraction)
  document.removeEventListener('keydown', startMusicAfterInteraction)
})

function onBlown() {
  setTimeout(async () => {
    stage.value = 'celebrate'
    await nextTick()
    wishAnchor.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 1200)
}
</script>

<template>
  <main class="relative min-h-dvh overflow-x-hidden bg-linear-to-b from-rose-100 via-pink-50 to-amber-50 text-slate-700">
    <audio v-if="birthday.music" ref="audio" :src="birthday.music" autoplay loop preload="auto" />
    <RotateDevice />

    <FallingPetals v-if="stage !== 'envelope'" />

    <Transition name="fade" mode="out-in">
      <section v-if="stage === 'envelope'" key="envelope" class="flex min-h-dvh items-center justify-center px-4">
        <EnvelopeLetter class="short:scale-85" :to="birthday.envelopeTo" @open="playMusic" @opened="stage = 'cake'" />
      </section>

      <section v-else key="party" class="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 pb-64">
        <!-- ให้เค้กอยู่กลางจอพอดี -->
        <div class="relative flex min-h-dvh w-full items-center justify-center">
          <BirthdayCake class="short:scale-85" :candles="birthday.candles" @blown="onBlown" />
          <img
            :src="birthday.decorations.cake"
            alt=""
            class="animate-float pointer-events-none absolute bottom-[8%] left-0 w-28 -rotate-6 mix-blend-multiply sm:bottom-[24%] sm:-left-12 sm:w-48"
          />
        </div>

        <template v-if="stage === 'celebrate'">
          <div ref="wishAnchor" class="relative w-full scroll-mt-6">
            <WishMessage
              :name="birthday.name"
              :title="birthday.title"
              :messages="birthday.messages"
              :from="birthday.from"
            />
            <img
              :src="birthday.decorations.flowers"
              alt=""
              class="animate-fade-up pointer-events-none absolute -top-10 -right-3 z-20 w-28 rotate-6 mix-blend-multiply [animation-delay:800ms] sm:-top-20 sm:-right-16 sm:w-44"
            />
          </div>
          <PhotoGallery :photos="birthday.photos" />
        </template>
      </section>
    </Transition>

    <FlowerBouquet v-if="stage === 'celebrate'" />
  </main>
</template>
