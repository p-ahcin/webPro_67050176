import { createContext, useContext, useEffect, useState } from 'react'
import { getProducts } from '../service/productApi.js'
import { sampleProducts } from '../sampleProducts.js'

const ShopContext = createContext(null)
export const money = (value) =>
  new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(value)
export const useShop = () => useContext(ShopContext)

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [source, setSource] = useState('')
  const [requestKey, setRequestKey] = useState(0)
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])
  const [notice, setNotice] = useState('')
  const [profile, setProfile] = useState({
    name: 'ณิชาพร อุทธยาน',
    email: '67050176@kmitl.ac.th',
    address: '',
  })

  // ข้อ 4.1–4.2: เรียก API เมื่อโหลดและยกเลิก request เมื่อ unmount
  // ใช้ข้อมูล mock เมื่อ API ผิดพลาด
  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const timer = setTimeout(() => controller.abort(), 10000)
    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = await getProducts(controller.signal)
        if (active) {
          setProducts(data)
          setSource('api')
        }
      } catch (err) {
        if (active) {
          setError(
            `ไม่สามารถดึงข้อมูล API ได้: ${err.message} — กำลังใช้ข้อมูลจำลองตามข้อ 2.1`
          )
          setProducts(sampleProducts.map((product) => ({ ...product })))
          setSource('mock')
        }
      } finally {
        clearTimeout(timer)
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
      clearTimeout(timer)
      controller.abort()
    }
  }, [requestKey])

  const cartItems = cart.flatMap((item) => {
    const product = products.find((product) => product.id === item.id)
    return product && product.stock > 0
      ? [{ ...product, quantity: Math.min(item.quantity, product.stock) }]
      : []
  })
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function addToCart(product) {
    const quantity = cart.find((item) => item.id === product.id)?.quantity ?? 0
    if (product.stock <= quantity) {
      setNotice('เพิ่มไม่ได้: จำนวนสินค้าเกินสต็อก')
      return
    }
    setCart((current) =>
      quantity
        ? current.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...current, { id: product.id, quantity: 1 }]
    )
    setNotice(`เพิ่ม ${product.name} ลงตะกร้าแล้ว`)
  }

  function changeQuantity(id, quantity) {
    const product = products.find((product) => product.id === id)
    if (
      !product ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > product.stock
    )
      return
    setCart((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id))
  }
  function deleteProduct(id) {
    setProducts((current) => current.filter((product) => product.id !== id))
    removeFromCart(id)
    setNotice('ลบสินค้าแล้ว ข้อมูลสรุปอัปเดตตามรายการล่าสุด')
  }
  function saveProduct(form, id) {
    if (id !== null)
      setProducts((current) =>
        current.map((product) => (product.id === id ? { ...product, ...form } : product))
      )
    else
      setProducts((current) => [
        ...current,
        {
          ...form,
          id: `local-${crypto.randomUUID()}`,
          image: '',
          description: 'สินค้าที่เพิ่มใหม่',
          rating: { rate: 0, count: 0 },
        },
      ])
    setNotice(id !== null ? 'แก้ไขสินค้าแล้ว' : 'เพิ่มสินค้าใหม่แล้ว')
  }
  function checkout() {
    if (!cartItems.length) return
    const order = {
      id: `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      date: new Date().toISOString(),
      items: cartItems.map((item) => ({ ...item })),
      total: cartTotal,
    }
    setOrders((current) => [order, ...current])
    setProducts((current) =>
      current.map((product) => ({
        ...product,
        stock:
          product.stock -
          (cartItems.find((item) => item.id === product.id)?.quantity ?? 0),
      }))
    )
    setCart([])
    setNotice(`สร้างคำสั่งซื้อ ${order.id} แล้ว`)
  }
  function useMock() {
    setProducts(sampleProducts.map((product) => ({ ...product })))
    setCart([])
    setError('')
    setSource('mock')
    setNotice('เปลี่ยนเป็นข้อมูลจำลอง 5 รายการตามข้อสอบแล้ว')
  }
  function retryApi() {
    setCart([])
    setRequestKey((current) => current + 1)
  }
  return (
    <ShopContext.Provider
      value={{
        products,
        loading,
        error,
        source,
        useMock,
        retryApi,
        saveProduct,
        deleteProduct,
        cartItems,
        cartTotal,
        addToCart,
        changeQuantity,
        removeFromCart,
        checkout,
        orders,
        profile,
        setProfile,
        notice,
        setNotice,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}
