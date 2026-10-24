import { useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../models/productModel.js'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)

  if (!product) {
    return (
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Product not found</h1>

        <button
          onClick={() => navigate('/products')}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Back to Products
        </button>
      </section>
    )
  }

  return (
    <section className="grid gap-6 rounded-xl bg-white p-6 shadow-sm md:grid-cols-2">
      <img
        src={product.image}
        alt={product.title}
        className="h-72 w-full object-contain"
      />

      <div>
        <p className="text-sm text-blue-600">{product.category}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-800">
          {product.title}
        </h1>
        <p className="mt-4 text-xl font-semibold">
          ฿{product.price.toLocaleString('th-TH')}
        </p>
        <p className="mt-4 text-slate-600">
          {product.description}
        </p>

        <button
          onClick={() => navigate('/products')}
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    </section>
  )
}