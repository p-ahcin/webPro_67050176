import { Link } from 'react-router-dom'
import { money, useShop } from '../context/ShopContext.jsx'

export default function Cart() {
  const { cartItems, cartTotal, changeQuantity, removeFromCart, checkout } = useShop()
  return (
    <>
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      {!cartItems.length ? (
        <section className="panel text-center">
          <p className="mb-5">ตะกร้าสินค้ายังว่าง</p>
          <Link to="/products" className="btn btn-primary">
            เลือกซื้อสินค้า
          </Link>
        </section>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
          <section className="space-y-4" aria-label="รายการในตะกร้า">
            {cartItems.map((item) => (
              <article key={item.id} className="panel space-y-4">
                <Link
                  to={`/products/${item.id}`}
                  className="font-bold hover:text-primary"
                >
                  {item.name}
                </Link>
                <p>
                  {money(item.price)} / ชิ้น · คงเหลือ {item.stock}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="flex items-center gap-3">
                    จำนวน {item.name}
                    <input
                      aria-label={`จำนวน ${item.name}`}
                      type="number"
                      min="1"
                      max={item.stock}
                      step="1"
                      value={item.quantity}
                      onChange={(event) =>
                        changeQuantity(item.id, Number(event.target.value))
                      }
                      className="input w-24"
                    />
                  </label>
                  <strong>{money(item.price * item.quantity)}</strong>
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ลบออก
                  </button>
                </div>
              </article>
            ))}
          </section>
          <aside className="panel space-y-4">
            <h2 className="text-xl font-bold">สรุปราคา</h2>
            <p className="flex justify-between">
              <span>จำนวนรวม</span>
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} ชิ้น</span>
            </p>
            <p className="flex justify-between text-xl font-bold">
              <span>ยอดรวม</span>
              <span>{money(cartTotal)}</span>
            </p>
            <button className="btn btn-primary w-full" onClick={checkout}>
              สั่งซื้อ
            </button>
            <p className="text-xs opacity-60">
              คำสั่งซื้อจะปรากฏใน Profile และ Admin พร้อมหักสต็อก
            </p>
          </aside>
        </div>
      )}
    </>
  )
}
