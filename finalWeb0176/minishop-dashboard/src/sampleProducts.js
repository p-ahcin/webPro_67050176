// ข้อ 2.1: ข้อมูลสำรองตามโจทย์ 5 รายการ; ใช้ภาพแทนเมื่อไม่มีรูปจริง
export const sampleProducts = [
  { id: 1, name: 'Wireless Mouse', category: 'Accessories', price: 450, stock: 20 },
  { id: 2, name: 'Mechanical Keyboard', category: 'Accessories', price: 1200, stock: 10 },
  { id: 3, name: 'Monitor 24 inch', category: 'Display', price: 3500, stock: 5 },
  { id: 4, name: 'USB-C Hub', category: 'Accessories', price: 850, stock: 0 },
  { id: 5, name: 'Webcam HD', category: 'Camera', price: 990, stock: 8 },
].map((product) => ({
  ...product,
  description: `${product.name} — สินค้าตัวอย่างสำหรับฝึกจัดการสต็อก`,
  image: '',
  rating: { rate: 4.5, count: 12 },
}))
