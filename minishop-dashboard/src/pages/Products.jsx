import { Link } from 'react-router-dom'
import { getProducts } from '../models/productModel.js'

export default function Products() {
  const products = getProducts()

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-slate-800">
        All Products
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="flex flex-col rounded-xl bg-white p-4 shadow-sm"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-contain"
            />

            <h2 className="mt-4 text-lg font-bold">
              {product.title}
            </h2>
            <p className="mt-1 text-slate-600">
              ฿{product.price.toLocaleString('th-TH')}
            </p>

            <Link
              to={`/products/${product.id}`}
              className="mt-4 block rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
            >
              View Detail
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}