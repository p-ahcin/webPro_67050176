export const API_URL = 'https://fakestoreapi.com/products'

// ข้อ 4.1: Public API ไม่มี stock จึงเติมสต็อกจำลองอย่างชัดเจน
export async function getProducts(signal) {
  const response = await fetch(API_URL, { signal })
  if (!response.ok) throw new Error(`API ตอบกลับ ${response.status}`)
  const data = await response.json()
  if (!Array.isArray(data) || data.length === 0)
    throw new Error('รูปแบบข้อมูล API ไม่ถูกต้องหรือไม่มีสินค้า')
  return data.map((product, index) => {
    if (!product.title || !Number.isFinite(product.price) || product.price < 0) {
      throw new Error('ข้อมูลสินค้า API ไม่ครบถ้วน')
    }
    return {
      ...product,
      name: product.title,
      stock: [20, 10, 5, 0, 8][index % 5],
      rating: product.rating ?? { rate: 0, count: 0 },
    }
  })
}
