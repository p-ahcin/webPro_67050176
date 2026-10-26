import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useShop } from '../context/ShopContext.jsx'
import { DataStatus, ProductCard, SummaryCards } from '../components/ProductUI.jsx'
import ProductForm from '../components/ProductForm.jsx'

export default function Products({ management = false }) {
  const { products, loading, deleteProduct } = useShop()
  const [search, setSearch] = useState('')
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? ''
  const categories = [
    ...new Set([
      'Accessories',
      'Display',
      'Camera',
      ...products.map((product) => product.category),
      ...(category ? [category] : []),
    ]),
  ]
  // ข้อ 3.1–3.2: filter ชื่อแบบไม่แยกตัวพิมพ์ และใช้เงื่อนไขหมวดหมู่ร่วมกัน
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.trim().toLowerCase()) &&
      (!category || product.category === category)
  )
  function resetFilters() {
    setSearch('')
    setParams({})
  }
  return (
    <>
      <div>
        <p className="mb-2 text-sm font-semibold text-primary">CATALOG / INVENTORY</p>
        <h1 className="text-3xl font-bold">
          {management ? 'Product Management' : 'Products'}
        </h1>
        <p className="mt-2 opacity-65">
          {management ? 'ค้นหาและจัดการสต็อกสินค้า' : 'ค้นหาและเลือกซื้อสินค้า'}
        </p>
      </div>
      <DataStatus />
      {!loading && (
        <>
          <SummaryCards />
          <section
            className="panel space-y-5"
            aria-label={management ? 'ค้นหาและจัดการสินค้า' : 'ค้นหาสินค้า'}
          >
            {management && <ProductForm onSaved={resetFilters} />}
            <div className="grid gap-4 md:grid-cols-[1fr_260px]">
              <label className="grid gap-2 text-sm font-medium">
                ค้นหาสินค้า
                <input
                  type="search"
                  className="input w-full"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="ค้นหาชื่อสินค้า..."
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                หมวดหมู่
                <select
                  aria-label="หมวดหมู่"
                  className="select w-full"
                  value={category}
                  onChange={(event) =>
                    setParams(event.target.value ? { category: event.target.value } : {})
                  }
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={resetFilters}
                disabled={!search && !category}
              >
                ล้างตัวกรอง
              </button>
            </div>
          </section>
          <p className="text-sm opacity-65">
            พบ {filteredProducts.length} จาก {products.length} รายการ
          </p>
          {!filteredProducts.length ? (
            <div className="panel text-center">
              <h2 className="text-xl font-semibold">ไม่พบสินค้า</h2>
              <p className="my-3 opacity-65">
                {management
                  ? 'ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ หรือเพิ่มสินค้าใหม่'
                  : 'ลองเปลี่ยนคำค้นหาหรือหมวดหมู่'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex flex-col gap-2">
                  <ProductCard product={product} />
                  {management && (
                    <button
                      className="btn btn-ghost btn-sm text-error"
                      aria-label={`Delete ${product.name}`}
                      onClick={() => {
                        if (window.confirm(`ต้องการลบสินค้า "${product.name}" หรือไม่?`))
                          deleteProduct(product.id)
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}
