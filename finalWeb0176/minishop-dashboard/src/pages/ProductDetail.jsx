import { Link, useParams } from 'react-router-dom'
import { money, useShop } from '../context/ShopContext.jsx'
import { DataStatus, ProductImage } from '../components/ProductUI.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const { products, loading, addToCart } = useShop()
  const product = products.find((product) => String(product.id) === id)
  if (loading) return <DataStatus />
  if (!product)
    return (
      <section className="panel">
        <h1 className="text-2xl font-bold">ไม่พบสินค้า</h1>
        <Link to="/products" className="btn mt-4">
          กลับไปเลือกสินค้า
        </Link>
      </section>
    )
  return (
    <>
      <Link to="/products" className="link">
        กลับไปหน้าสินค้า
      </Link>
      <article className="panel grid items-start gap-8 md:grid-cols-2">
        <ProductImage product={product} large />
        <div className="space-y-5">
          <p className="badge badge-outline">{product.category}</p>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-3xl font-bold text-primary">{money(product.price)}</p>
          <p className="leading-relaxed opacity-75">{product.description}</p>
          <p>
            ★ {product.rating.rate} / 5 ({product.rating.count} รีวิว)
          </p>
          <p className={product.stock ? 'text-success' : 'text-error'}>
            {product.stock ? 'In Stock' : 'Out of Stock'} · คงเหลือ {product.stock} ชิ้น
          </p>
          <button
            className="btn btn-primary"
            disabled={!product.stock}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </article>
    </>
  )
}
