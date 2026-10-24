import { useEffect, useRef, useState } from 'react'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../service/productApi.js'

export default function ProductManagement() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
  })
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const modalRef = useRef(null)

  async function loadProducts() {
    setLoading(true)
    setError('')

    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message || 'ไม่สามารถโหลดข้อมูลสินค้าได้')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleEdit(product) {
    setEditingId(product.id)
    setForm({
      title: product.title,
      price: String(product.price),
      category: product.category ?? '',
      description: product.description ?? '',
    })
    setFormError('')
    modalRef.current.showModal()
  }

  function resetForm() {
    setEditingId(null)
    setForm({
      title: '',
      price: '',
      category: '',
      description: '',
    })
    setFormError('')
  }

  function openAddModal() {
    resetForm()
    modalRef.current.showModal()
  }

  function closeModal() {
    if (saving) return

    modalRef.current.close()
    resetForm()
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (saving) return

    const product = {
      title: form.title.trim(),
      price: Number(form.price),
      category: form.category.trim(),
      description: form.description.trim(),
    }

    if (!product.title) {
      setFormError('กรุณากรอกชื่อสินค้า')
      return
    }

    if (!Number.isFinite(product.price) || product.price <= 0) {
      setFormError('ราคาต้องเป็นตัวเลขที่มากกว่า 0')
      return
    }

    setSaving(true)
    setFormError('')

    try {
      if (editingId !== null) {
        await updateProduct(editingId, product)
      } else {
        await createProduct(product)
      }

      modalRef.current.close()
      resetForm()
      await loadProducts()
    } catch (err) {
      setFormError(err.message || 'ไม่สามารถบันทึกสินค้าได้')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(product) {
    if (saving) return

    const confirmed = window.confirm(
      `ต้องการลบสินค้า "${product.title}" หรือไม่?`
    )

    if (!confirmed) return

    setSaving(true)
    setFormError('')

    try {
      await deleteProduct(product.id)

      if (editingId === product.id) {
        resetForm()
      }

      await loadProducts()
    } catch (err) {
      setError(err.message || 'ไม่สามารถลบสินค้าได้')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="space-y-6">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Admin</li>
          <li>Products</li>
        </ul>
      </div>

      <h1 className="text-3xl font-bold">
        Product Management
      </h1>

        <button
          type="button"
          onClick={openAddModal}
          disabled={saving || loading || Boolean(error)}
          className="btn btn-primary"
        >
          Add Product
        </button>

        <dialog
          ref={modalRef}
          className="modal"
          aria-labelledby="product-modal-title"
          onCancel={(event) => {
            event.preventDefault()
            closeModal()
          }}
        >
          <div className="modal-box max-h-[90vh] max-w-2xl overflow-y-auto">
            <h2 id="product-modal-title" className="mb-6 text-xl font-bold">
              {editingId !== null ? 'Edit Product' : 'Add Product'}
            </h2>

            <form onSubmit={handleSubmit} noValidate className="grid gap-4">
              <label className="grid gap-2">
                <span>ชื่อสินค้า</span>
                <input
                  autoFocus
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  disabled={saving}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="grid gap-2">
                <span>ราคา (บาท)</span>
                <input
                  type="number"
                  name="price"
                  step="any"
                  value={form.price}
                  onChange={handleChange}
                  disabled={saving}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="grid gap-2">
                <span>หมวดหมู่</span>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  disabled={saving}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="grid gap-2">
                <span>รายละเอียด</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  disabled={saving}
                  className="textarea textarea-bordered w-full"
                />
              </label>

              {formError && (
                <div role="alert" className="alert alert-error">
                  <span>{formError}</span>
                </div>
              )}

              <div className="modal-action">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="btn"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                >
                  {saving
                    ? 'Saving...'
                    : editingId !== null
                      ? 'Save Changes'
                      : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </dialog>

      {loading ? (
        <div role="status" className="flex items-center justify-center gap-3 p-10">
          <span className="loading loading-spinner loading-lg" />
          <span>Loading products...</span>
        </div>
      ) : error ? (
        <div role="alert" className="alert alert-error">
          <span>{error}</span>
          <button onClick={loadProducts} className="btn btn-sm">
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div role="status" className="alert">
          <span>ยังไม่มีสินค้า</span>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box bg-base-100 p-4 shadow-sm">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>ชื่อสินค้า</th>
                <th>หมวดหมู่</th>
                <th className="text-right">ราคา (บาท)</th>
                <th>จัดการ</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td className="font-medium">{product.title}</td>
                  <td>
                    <span className="badge badge-outline">
                      {product.category || 'ไม่ระบุ'}
                    </span>
                  </td>
                  <td className="text-right">
                    {Number(product.price).toLocaleString('th-TH')}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        disabled={saving || loading}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(product)}
                        disabled={saving || loading}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
