import { useRef, useState } from 'react'
import { useShop } from '../context/ShopContext.jsx'

const emptyForm = { name: '', category: 'Accessories', price: '', stock: '' }

export default function ProductForm({ onSaved }) {
  const { products, saveProduct } = useShop()
  const dialog = useRef(null)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const categories = [
    ...new Set([
      'Accessories',
      'Display',
      'Camera',
      ...products.map((product) => product.category),
    ]),
  ]

  function open(product = null) {
    setEditingId(product?.id ?? null)
    setForm(
      product
        ? {
            name: product.name,
            category: product.category,
            price: String(product.price),
            stock: String(product.stock),
          }
        : emptyForm
    )
    setError('')
    dialog.current.showModal()
  }
  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }
  function submit(event) {
    event.preventDefault()
    const product = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
    }
    if (!product.name) {
      setError('กรุณากรอกชื่อสินค้า')
      return
    }
    if (
      form.price.trim() === '' ||
      !Number.isFinite(product.price) ||
      product.price <= 0
    ) {
      setError('ราคาต้องเป็นตัวเลขที่มากกว่า 0')
      return
    }
    if (
      form.stock.trim() === '' ||
      !Number.isSafeInteger(product.stock) ||
      product.stock < 0
    ) {
      setError('สต็อกต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป')
      return
    }
    saveProduct(product, editingId)
    onSaved?.()
    dialog.current.close()
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <button className="btn btn-primary" onClick={() => open()}>
          + Add Product
        </button>
        <label className="flex flex-wrap items-center gap-2 whitespace-nowrap text-sm">
          แก้ไขสินค้า
          <select
            aria-label="แก้ไขสินค้า"
            className="select select-bordered max-w-48"
            value=""
            onChange={(event) => {
              const product = products.find(
                (product) => String(product.id) === event.target.value
              )
              if (product) open(product)
            }}
          >
            <option value="">เลือกสินค้าเพื่อแก้ไข</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <dialog ref={dialog} className="modal" aria-labelledby="product-form-title">
        <div className="modal-box">
          <h2 id="product-form-title" className="mb-5 text-2xl font-bold">
            {editingId !== null ? 'Edit Product' : 'Add Product'}
          </h2>
          <form noValidate onSubmit={submit} className="grid gap-4">
            <label className="grid gap-2">
              Product Name
              <input
                autoFocus
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input w-full"
              />
            </label>
            <label className="grid gap-2">
              Category
              <select
                aria-label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="select w-full"
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              Price
              <input
                type="number"
                name="price"
                min="0.01"
                step="any"
                value={form.price}
                onChange={handleChange}
                className="input w-full"
              />
            </label>
            <label className="grid gap-2">
              Stock
              <input
                type="number"
                name="stock"
                min="0"
                step="1"
                value={form.stock}
                onChange={handleChange}
                className="input w-full"
              />
            </label>
            {error && (
              <p role="alert" className="text-error">
                {error}
              </p>
            )}
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => dialog.current.close()}
              >
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                {editingId !== null ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
