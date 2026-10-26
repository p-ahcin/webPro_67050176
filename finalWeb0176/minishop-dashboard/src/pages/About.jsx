export default function About() {
  return (
    <section className="panel max-w-3xl space-y-5">
      <p className="text-sm font-semibold text-primary">ABOUT THE PROJECT</p>
      <h1 className="text-3xl font-bold">MiniShop Dashboard</h1>
      <p className="leading-relaxed">
        โปรเจกต์วิชา Web Programming พัฒนาด้วย React, Vite,
        React Router, Tailwind CSS และ DaisyUI รองรับหน้าร้าน รายละเอียดสินค้า
        ตะกร้าสินค้า โปรไฟล์ และ Admin Dashboard
      </p>
      <h2 className="text-xl font-bold">การจัดการข้อมูล</h2>
      <p className="leading-relaxed">
        โหลดสินค้าจาก Fake Store API เมื่อเปิดแอป หากเรียกไม่ได้จะใช้ข้อมูลจำลอง 5
        รายการตามข้อสอบ สต็อกของสินค้า API เป็นข้อมูลจำลอง ราคาจาก API
        ใช้ตัวเลขเดิมและแสดงเป็นบาทเพื่อการฝึก ไม่มีการแปลงอัตราแลกเปลี่ยน
      </p>
      <p className="leading-relaxed">
        เพิ่ม แก้ไข ลบสินค้า ตะกร้า โปรไฟล์ และคำสั่งซื้อจัดการด้วย React State
        ข้อมูลอยู่ตลอดการเปลี่ยนหน้าภายในแอป และเริ่มใหม่เมื่อรีเฟรช ไม่มีการชำระเงินจริง
        ส่วน Light/Dark Mode จะจำค่าไว้ในเครื่อง
      </p>
      <p className="text-sm opacity-65">ผู้จัดทำ ณิชาพร อุทธยาน · 67050176</p>
    </section>
  )
}
