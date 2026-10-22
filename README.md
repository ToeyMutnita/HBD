# 🎂 HBD Surprise

Vue 3 + TypeScript + Tailwind CSS v4 + Vite

```bash
npm install
npm run dev      # เปิดดูที่ http://localhost:5173
npm run build    # ได้ไฟล์เว็บในโฟลเดอร์ dist/
```

## แก้เนื้อหา
- ข้อความ ชื่อ จำนวนเทียน รูป เพลง → `src/config/birthday.ts`
- รูป → วางไว้ที่ `public/images/` (ค่าเริ่มต้นคือ 1.jpg – 6.jpg)
- เพลง (ไม่บังคับ) → วางไว้ที่ `public/music/` แล้วตั้งค่า `music`

## ลำดับฉาก
1. `EnvelopeLetter` – ซองจดหมาย แตะเพื่อเปิด
2. `BirthdayCake` – เค้กลอยขึ้นมา แตะเพื่อเป่าเทียน
3. `WishMessage` + `PhotoGallery` + `FlowerBouquet` – คำอวยพร รูป และดอกไม้บาน
