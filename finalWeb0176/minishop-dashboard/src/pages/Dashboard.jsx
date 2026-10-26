import { Link } from 'react-router-dom'
import { money, useShop } from '../context/ShopContext.jsx'
import { DataStatus, SummaryCards } from '../components/ProductUI.jsx'
import OrderList from '../components/OrderList.jsx'

export default function Dashboard() {
  const { products, orders, loading } = useShop()
  const categories = [...new Set(products.map((product) => product.category))].map(
    (name) => ({
      name,
      stock: products
        .filter((product) => product.category === name)
        .reduce((sum, product) => sum + product.stock, 0),
    })
  )
  const maximum = Math.max(1, ...categories.map((category) => category.stock))
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-primary">STORE OVERVIEW</p>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <Link to="/admin/products" className="btn btn-primary">
          Manage Products
        </Link>
      </div>
      <DataStatus />
      {!loading && (
        <>
          <SummaryCards />
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <section className="panel">
              <h2 className="mb-6 text-xl font-bold">สต็อกแยกตามหมวดหมู่</h2>
              <div
                role="img"
                aria-label="กราฟแท่งจำนวนสินค้าคงเหลือแยกหมวดหมู่"
                className="space-y-5"
              >
                {categories.map((category) => (
                  <div key={category.name}>
                    <p className="mb-2 flex justify-between gap-3 text-sm">
                      <span>{category.name}</span>
                      <strong>{category.stock} ชิ้น</strong>
                    </p>
                    <div className="h-3 overflow-hidden rounded-full bg-base-200">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(category.stock / maximum) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {!categories.length && <p>ไม่มีข้อมูลสินค้า</p>}
            </section>
            <section className="panel space-y-5">
              <h2 className="text-xl font-bold">ยอดขาย</h2>
              <p className="break-words text-3xl font-bold text-primary">
                {money(orders.reduce((sum, order) => sum + order.total, 0))}
              </p>
              <p>{orders.length} คำสั่งซื้อ</p>
              <p className="text-sm opacity-65">
                คำนวณจากคำสั่งซื้อในรอบการใช้งานนี้
              </p>
            </section>
          </div>
          <section className="panel">
            <h2 className="mb-3 text-xl font-bold">รายการคำสั่งซื้อ</h2>
            <OrderList />
          </section>
        </>
      )}
    </>
  )
}
