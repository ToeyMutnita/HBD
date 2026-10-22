/**
 * ✏️ แก้ข้อมูลทั้งหมดของเว็บได้ที่ไฟล์นี้ไฟล์เดียว
 * - รูป: วางไฟล์ไว้ที่ public/images/ แล้วใส่ชื่อไฟล์ใน photos
 * - เพลง (ไม่บังคับ): วางไฟล์ไว้ที่ public/music/ แล้วใส่ชื่อไฟล์ใน music
 */

export interface Photo {
  src: string
  caption?: string
}

export interface BirthdayConfig {
  /** ชื่อแฟน */
  name: string
  /** ข้อความหน้าซองจดหมาย */
  envelopeTo: string
  /** จำนวนเทียนบนเค้ก */
  candles: number
  /** หัวข้อคำอวยพร */
  title: string
  /** คำอวยพร (แต่ละรายการ = 1 ย่อหน้า) */
  messages: string[]
  /** ชื่อผู้ส่ง */
  from: string
  photos: Photo[]
  /** path เพลง ถ้าไม่ใช้ให้เป็น '' */
  music: string
  /** รูปตกแต่ง (พื้นขาวจะกลืนไปกับพื้นหลังอัตโนมัติ) */
  decorations: {
    /** ข้าง ๆ เค้ก */
    cake: string
    /** มุมการ์ดคำอวยพร */
    flowers: string
  }
}

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const birthday: BirthdayConfig = {
  name: 'Baby',
  envelopeTo: 'to my favorite person!💕',
  candles: 3,
  title: '19th ',
  messages: [
    'วันนี้คนเก่งเติบโตขึ้นอีกปี ขอให้มีความสุขมากๆในทุกๆวัน',
    'ขอให้เธอกินอิ่มนอนหลับ ขอให้สิ่งที่เธอหวังค่อยๆเป็นจริง',
    'คิดสิ่งใดก็ขอให้สมปราถนา สอบติด เพรี้ยงๆๆ❤️',
    "You're not getting older,you're getting better!"
  ],
  from: 'muthita',
  photos: [
    { src: asset('images/1.jpg'), caption: "น้องดีโด้" },
    { src: asset('images/2.jpg'), caption: '❤️' },
  ],
  music: asset('music/BILLKIN-FromNowOn.mp3'),
  decorations: {
    cake: asset('images/deco/snoopy-cake.png'),
    flowers: asset('images/deco/snoopy-flowers.png'),
  },
}
