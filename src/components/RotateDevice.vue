<template>
  <!-- แสดงเฉพาะอุปกรณ์จอสัมผัสที่ถือแนวตั้ง หมุนเป็นแนวนอนแล้วจะหายไปเอง -->
  <div
    class="fixed inset-0 z-50 hidden flex-col items-center justify-center gap-8 bg-linear-to-b from-rose-200 to-pink-100 px-8 text-center portrait:pointer-coarse:flex"
    role="alert"
  >
    <div class="phone relative h-28 w-16 rounded-2xl border-4 border-rose-500 bg-white/70">
      <span class="absolute bottom-1.5 left-1/2 size-2 -translate-x-1/2 rounded-full bg-rose-400" />
    </div>

    <div>
      <p class="font-script text-4xl text-rose-500">Please rotate</p>
      <p class="mt-3 text-lg text-rose-600">หมุนโทรศัพท์เป็นแนวนอนก่อนนะ 💕</p>
      <p class="mt-1 text-sm text-rose-400">(ถ้าหมุนแล้วไม่เปลี่ยน ลองปิดล็อกการหมุนจอดูนะ)</p>
    </div>
  </div>
</template>

<style scoped>
.phone {
  animation: rotate-phone 2.4s ease-in-out infinite;
}

@keyframes rotate-phone {
  0%, 20% { rotate: 0deg; }
  50%, 80% { rotate: -90deg; }
  100% { rotate: 0deg; }
}
</style>
