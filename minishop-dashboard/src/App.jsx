import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Icon from './components/Icon.jsx'
import ProductList from './components/ProductList.jsx'
import Profile from './components/Profile.jsx'
import { money } from './components/ProductCard.jsx'
import sampleProducts from './sampleProducts.js'

const API_URL = 'https://fakestoreapi.com/products'
const navigation = [
  ['dashboard', 'Dashboard', 'home'],
  ['products', 'Products', 'box'],
  ['profile', 'Profile', 'user'],
]

function NavItem({ id, label, icon, view, onSelect }) {
  const active = view === id
  return (
    <button onClick={() => onSelect(id)} aria-current={active ? 'page' : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${active ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
      <Icon name={icon} /><span>{label}</span>
    </button>
  )
}

function Dashboard({ productCount, cartCount, usingSamples, onShop }) {
  const metrics = [
    ['Products', productCount, 'box', 'bg-blue-100 text-blue-600'],
    ['Cart Items', cartCount, 'cart', 'bg-emerald-100 text-emerald-600'],
    ['Data Source', usingSamples ? 'Sample' : 'Live API', 'star', 'bg-violet-100 text-violet-600'],
  ]
  return (
    <section>
      <h1 className="mb-5 text-2xl font-bold text-slate-900">Dashboard</h1>
      <div className="grid gap-3 sm:grid-cols-3">
        {metrics.map(([label, value, name, color]) => (
          <article key={label} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className={`grid h-11 w-11 place-items-center rounded-full ${color}`}><Icon name={name} /></span>
              <div><p className="text-xs font-medium text-slate-600">{label}</p><p className="mt-1 text-2xl font-bold text-slate-800">{value}</p></div>
            </div>
          </article>
        ))}
      </div>
      <article className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800">Explore MiniShop</h2>
        <p className="mt-2 text-sm text-slate-600">Browse products, search by name, filter by category, and add your favorites to the cart.</p>
        <button onClick={onShop} className="mt-5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Shop Products</button>
      </article>
    </section>
  )
}

function Dialog({ title, onClose, children }) {
  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section role="dialog" aria-modal="true" aria-label={title} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4"><h2 className="text-xl font-bold text-slate-900">{title}</h2><button onClick={onClose} aria-label="Close" className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"><Icon name="close" /></button></div>
        {children}
      </section>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('dashboard')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [dialog, setDialog] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const useSamples = () => {
      setProducts(sampleProducts)
      setError('ไม่สามารถโหลดข้อมูลได้ — กำลังแสดงสินค้าตัวอย่าง')
    }
    const timeout = window.setTimeout(() => {
      controller.abort()
      useSamples()
      setLoading(false)
    }, 12000)
    setLoading(true)
    setError('')

    fetch(API_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Invalid product data')
        setProducts(data)
      })
      .catch((cause) => {
        if (cause.name !== 'AbortError') useSamples()
      })
      .finally(() => {
        window.clearTimeout(timeout)
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => {
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [retry])

  const categories = useMemo(() => [...new Set(products.map((product) => product.category))].sort(), [products])
  const filteredProducts = useMemo(() => {
    const result = products.filter((product) =>
      product.title.toLowerCase().includes(search.trim().toLowerCase()) &&
      (category === 'all' || product.category === category),
    )
    if (sort === 'low') result.sort((a, b) => a.price - b.price)
    if (sort === 'high') result.sort((a, b) => b.price - a.price)
    return result
  }, [products, search, category, sort])

  function addToCart(product) {
    setCartCount((count) => count + 1)
    setCartItems((items) => {
      const found = items.find((item) => item.id === product.id)
      return found
        ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { id: product.id, title: product.title, price: product.price, quantity: 1 }]
    })
  }

  function productsContent() {
    if (loading) return <p role="status" className="rounded-xl bg-white p-10 text-center text-slate-600">Loading products...</p>
    return <>
      {error && <div role="alert" className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm"><p className="text-amber-900">{error}</p><button onClick={() => setRetry((count) => count + 1)} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">Try Again</button></div>}
      {filteredProducts.length === 0
        ? <p className="rounded-xl bg-white p-10 text-center text-slate-600">ไม่พบสินค้าที่ค้นหา</p>
        : <ProductList products={filteredProducts} onAdd={addToCart} onDetail={(product) => setDialog(product)} />}
    </>
  }

  return (
    <main className="min-h-screen bg-slate-50 p-3 sm:p-5">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-xl shadow-slate-200/60">
        <Header cartCount={cartCount} onHome={() => setView('dashboard')} onCart={() => setDialog('cart')} />
        <div className="flex min-h-[620px]">
          <aside className="hidden w-40 shrink-0 border-r border-slate-200 bg-white p-2 sm:block"><nav className="space-y-1">{navigation.map(([id, label, icon]) => <NavItem key={id} id={id} label={label} icon={icon} view={view} onSelect={setView} />)}</nav></aside>
          <div className="min-w-0 flex-1 bg-slate-50 p-4 sm:p-6">
            {view === 'dashboard' && <Dashboard productCount={products.length} cartCount={cartCount} usingSamples={Boolean(error)} onShop={() => setView('products')} />}
            {view === 'products' && <section>
              <h1 className="mb-4 text-2xl font-bold text-slate-900">Products</h1>
              <div className="mb-4 grid gap-3 md:grid-cols-[1fr_180px_180px]">
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-slate-400 shadow-sm"><Icon name="search" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} className="w-full py-2.5 text-sm text-slate-700 outline-none" placeholder="Search products..." aria-label="Search products" /></label>
                <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter category" className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm"><option value="all">All Categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select>
                <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort by price" className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm"><option value="default">Default order</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select>
              </div>
              {productsContent()}
            </section>}
            {view === 'profile' && <Profile cartCount={cartCount} />}
          </div>
        </div>
        <nav className="flex justify-around border-t border-slate-200 bg-white p-2 sm:hidden">{navigation.map(([id, label, icon]) => <NavItem key={id} id={id} label={label === 'Dashboard' ? 'Home' : label} icon={icon} view={view} onSelect={setView} />)}</nav>
      </div>

      {dialog === 'cart' && <Dialog title={`Cart (${cartCount})`} onClose={() => setDialog(null)}>
        {cartItems.length === 0 ? <p className="py-8 text-center text-slate-600">Your cart is empty.</p> : <><ul className="divide-y divide-slate-100">{cartItems.map((item) => <li key={item.id} className="flex justify-between gap-4 py-3 text-sm"><span className="text-slate-800">{item.title} × {item.quantity}</span><strong className="shrink-0">{money(item.price * item.quantity)}</strong></li>)}</ul><p className="mt-4 border-t pt-4 text-right font-bold">Total: {money(cartItems.reduce((total, item) => total + item.price * item.quantity, 0))}</p></>}
      </Dialog>}
      {dialog && dialog !== 'cart' && <Dialog title={dialog.title} onClose={() => setDialog(null)}>
        <img src={dialog.image} alt={dialog.title} className="mx-auto h-44 w-full object-contain" />
        <p className="mt-4 text-sm capitalize text-blue-600">{dialog.category}</p>
        <p className="mt-2 text-slate-600">{dialog.description}</p>
        <p className="mt-3 text-sm text-slate-600">Rating: {dialog.rating?.rate ?? '—'} ({dialog.rating?.count ?? 0} reviews)</p>
        <p className="mt-3 text-xl font-bold">{money(dialog.price)}</p>
        <button onClick={() => addToCart(dialog)} className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700">Add to Cart</button>
      </Dialog>}
    </main>
  )
}
