import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../service/productApi.js'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        setError(err.message || 'ไม่สามารถโหลดข้อมูลสินค้าได้')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const totalValue = products.reduce(
    (sum, product) => sum + Number(product.price || 0),
    0
  )

  const categoryCount = new Set(
    products.map((product) => product.category).filter(Boolean)
  ).size

  const stats = [
    { title: 'Total Products', value: products.length },
    {
      title: 'Product Value',
      value: `฿${totalValue.toLocaleString('th-TH')}`,
    },
    { title: 'Categories', value: categoryCount },
  ]

  if (loading) {
    return (
      <div role="status" className="flex items-center justify-center gap-3 p-10">
        <span className="loading loading-spinner loading-lg" />
        <span>Loading products...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error}</span>
        <button
          className="btn btn-sm"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Admin</li>
          <li>Dashboard</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/admin/products" className="btn btn-primary">
          Manage Products
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.title} className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-base">{stat.title}</h2>
              <p className="break-words text-3xl font-bold">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Product Overview</h2>

          {products.length === 0 ? (
            <p>ยังไม่มีสินค้าในระบบ</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((product) => (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>
                        <span className="badge badge-outline">
                          {product.category || 'ไม่ระบุ'}
                        </span>
                      </td>
                      <td>
                        ฿{Number(product.price).toLocaleString('th-TH')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}