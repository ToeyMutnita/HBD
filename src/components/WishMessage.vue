<script setup lang="ts">
defineProps<{
  name: string
  title: string
  messages: string[]
  from: string
}>()
</script>

<template>
  <section class="relative z-10 mt-14 w-full rounded-3xl bg-white/80 p-6 text-center shadow-xl backdrop-blur sm:p-10">
    <p class="animate-fade-up font-script text-5xl text-rose-500 sm:text-6xl">Happy Birthday</p>
    <h1 class="animate-fade-up mt-3 text-2xl font-bold text-rose-600 [animation-delay:200ms] sm:text-3xl">
      {{ title }} 🎂
    </h1>

    <div class="mt-6 space-y-2 leading-relaxed text-slate-600 sm:text-lg">
      <p
        v-for="(m, i) in messages"
        :key="i"
        class="animate-fade-up"
        :style="{ animationDelay: `${600 + i * 500}ms` }"
      >
        {{ m }}
      </p>
    </div>

    <p
      class="animate-fade-up mt-8 text-right text-slate-500"
      :style="{ animationDelay: `${600 + messages.length * 500}ms` }"
    >
      Love,<br />
      <span class="font-script text-3xl text-rose-500">{{ from }}</span>
    </p>
  </section>
</template>
