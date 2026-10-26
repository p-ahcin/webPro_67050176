import { Link } from 'react-router-dom'
import { money, useShop } from '../context/ShopContext.jsx'

export function DataStatus() {
  const { loading, error, source, retryApi, useMock } = useShop()
  if (loading)
    return (
      <div role="status" className="alert">
        <span className="loading loading-spinner" />
        Loading products...
      </div>
    )
  return (
    <div className="space-y-3">
      {error && (
        <div role="alert" className="alert alert-warning">
          {error}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className={`badge ${source === 'api' ? 'badge-success' : 'badge-info'}`}>
          {source === 'api' ? 'Fake Store API' : 'Mock Data · ข้อ 2.1'}
        </span>
        <span className="opacity-65">
          {source === 'api'
            ? 'สต็อกเป็นข้อมูลจำลอง · ราคา API ใช้ตัวเลขเดิมในสกุลบาทเพื่อการฝึก'
            : 'ข้อมูลเริ่มต้น 5 รายการตามโจทย์'}
        </span>
        <button onClick={retryApi} className="btn btn-outline btn-xs">
          โหลด API ใหม่
        </button>
        <button onClick={useMock} className="btn btn-ghost btn-xs">
          ใช้ข้อมูลตามข้อสอบ
        </button>
      </div>
    </div>
  )
}

export function SummaryCards() {
  const { products } = useShop()
  const stats = [
    ['สินค้าทั้งหมด', products.length, 'รายการสินค้าในระบบ'],
    [
      'มูลค่าสินค้าคงเหลือ',
      money(products.reduce((sum, product) => sum + product.price * product.stock, 0)),
      'ผลรวม price × stock',
    ],
    [
      'สินค้าหมดสต็อก',
      products.filter((product) => product.stock === 0).length,
      'รายการที่ stock = 0',
    ],
  ]
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map(([label, value, description]) => (
        <section key={label} className="panel">
          <h2 className="text-sm opacity-65">{label}</h2>
          <p className="my-3 break-words text-3xl font-bold" data-testid={label}>
            {value}
          </p>
          <p className="text-xs opacity-60">{description}</p>
        </section>
      ))}
    </div>
  )
}

export function ProductImage({ product, large = false }) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden
        rounded-xl bg-white p-6 ${large ? 'h-80' : 'h-44'}`}
    >
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.style.display = 'none'
            event.currentTarget.nextElementSibling.hidden = false
          }}
          className="h-full w-full object-contain"
        />
      ) : null}
      <span
        hidden={Boolean(product.image)}
        className="text-6xl text-indigo-400"
        role="img"
        aria-label={`ภาพแทน ${product.name}`}
      >
        ▣
      </span>
    </div>
  )
}

export function ProductCard({ product }) {
  const { addToCart } = useShop()
  return (
    <article
      className={`card border border-base-300 bg-base-100
        shadow-sm transition-shadow hover:shadow-lg`}
    >
      <Link
        to={`/products/${product.id}`}
        className="p-4 pb-0"
        aria-label={`ดูรายละเอียด ${product.name}`}
      >
        <ProductImage product={product} />
      </Link>
      <div className="card-body gap-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {product.category}
        </p>
        <h2 className="min-h-12 font-bold">
          <Link to={`/products/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h2>
        <p className="text-2xl font-bold">{money(product.price)}</p>
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span
            className={`badge badge-soft ${
              product.stock ? 'badge-success' : 'badge-error'
            }`}
          >
            {product.stock ? 'In Stock' : 'Out of Stock'}
          </span>
          <span>คงเหลือ {product.stock} ชิ้น</span>
        </div>
        <button
          className="btn btn-primary mt-2 w-full"
          disabled={!product.stock}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}
