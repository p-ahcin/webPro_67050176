import { Link, NavLink, Outlet } from 'react-router-dom'
import { useShop } from '../context/ShopContext.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function Layout() {
  const { cartItems, notice, setNotice } = useShop()
  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium ${
      isActive ? 'bg-primary text-primary-content' : 'hover:bg-base-200'
    }`
  return (
    <div className="flex min-h-screen flex-col bg-base-200 text-base-content">
      <header className="border-b border-base-300 bg-base-100">
        <div
          className={`mx-auto flex max-w-7xl flex-wrap items-center
            justify-between gap-4 px-4 py-5 md:px-8`}
        >
          <Link to="/" className="text-2xl font-black tracking-tight">
            Mini<span className="text-primary">Shop</span>
            <span className="ml-2 text-xs font-normal opacity-60">DASHBOARD</span>
          </Link>
          <div className="ml-auto shrink-0 lg:order-last lg:ml-0">
            <ThemeToggle />
          </div>
          <nav
            aria-label="Main navigation"
            className="flex w-full flex-wrap gap-1 lg:ml-auto lg:w-auto"
          >
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={navClass}>
              Products
            </NavLink>
            <NavLink to="/about" className={navClass}>
              About
            </NavLink>
            <NavLink to="/cart" className={navClass}>
              Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </NavLink>
            <NavLink to="/profile" className={navClass}>
              Profile
            </NavLink>
            <NavLink to="/admin/dashboard" className={navClass}>
              Admin
            </NavLink>
          </nav>
        </div>
      </header>
      <main
        className={`mx-auto w-full max-w-7xl flex-1 space-y-6
          px-4 py-6 md:px-8 md:py-8`}
      >
        {notice && (
          <div role="status" className="alert alert-success flex justify-between">
            <span>{notice}</span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setNotice('')}
              aria-label="ปิดข้อความ"
            >
              ×
            </button>
          </div>
        )}
        <Outlet />
      </main>
      <footer
        className={`border-t border-base-300 bg-base-100
          p-6 text-center text-sm opacity-70`}
      >
        © {new Date().getFullYear()} MiniShop Dashboard · 67050176 · Web Programming
      </footer>
    </div>
  )
}
