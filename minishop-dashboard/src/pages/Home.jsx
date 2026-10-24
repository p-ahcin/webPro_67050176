import { Link } from 'react-router-dom'
import { getProducts } from '../models/productModel.js'

export default function Home() {
  const featuredProducts = getProducts().slice(0, 2)

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-800">
        Welcome to MiniShop
      </h1>
      <p className="mt-2 text-slate-600">
        ร้านค้าสำหรับฝึกพัฒนาเว็บด้วย React
      </p>

      <h2 className="mb-4 mt-8 text-xl font-semibold">
        Featured Products
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {featuredProducts.map((product) => (
          <article
            key={product.id}
            className="rounded-xl bg-white p-4 shadow-sm"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-contain"
            />

            <h3 className="mt-4 text-lg font-bold">
              {product.title}
            </h3>
            <p className="mt-1 text-slate-600">
              ฿{product.price.toLocaleString('th-TH')}
            </p>

            <Link
              to={`/products/${product.id}`}
              className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              View Detail
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}