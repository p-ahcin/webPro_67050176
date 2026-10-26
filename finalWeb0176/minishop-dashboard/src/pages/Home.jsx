import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext.jsx'
import { DataStatus, ProductCard, SummaryCards } from '../components/ProductUI.jsx'

export default function Home() {
  const { products, loading } = useShop()
  return (
    <>
      <section className="rounded-2xl bg-indigo-950 p-7 text-white md:p-12">
        <p
          className={`mb-3 text-sm font-semibold uppercase
            tracking-widest text-indigo-200`}
        >
          Your everyday essentials
        </p>
        <h1 className="max-w-xl text-4xl font-black leading-tight md:text-5xl">
          MiniShop Dashboard
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-indigo-100">
          เลือกสินค้าที่ใช่ ดูสต็อกได้ทันที และจัดการทุกอย่างในที่เดียว
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/products"
            className="btn border-none bg-white text-indigo-950 hover:bg-indigo-100"
          >
            เลือกซื้อสินค้า
          </Link>
          <Link
            to="/admin/dashboard"
            className="btn btn-outline border-indigo-300 text-white hover:bg-indigo-800"
          >
            จัดการร้านค้า
          </Link>
        </div>
      </section>
      <DataStatus />
      {!loading && (
        <>
          <SummaryCards />
          <section
            className="flex flex-wrap items-center gap-3"
            aria-label="หมวดหมู่สินค้า"
          >
            <h2 className="mr-2 font-semibold">หมวดหมู่</h2>
            {[...new Set(products.map((product) => product.category))].map((category) => (
              <Link
                key={category}
                className="btn btn-sm btn-outline rounded-full"
                to={`/products?category=${encodeURIComponent(category)}`}
              >
                {category}
              </Link>
            ))}
          </section>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="/products" className="link link-primary">
              ดูทั้งหมด
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {!products.length && (
            <p className="panel">ยังไม่มีสินค้า เพิ่มสินค้าได้ที่หน้า Products</p>
          )}
        </>
      )}
    </>
  )
}
