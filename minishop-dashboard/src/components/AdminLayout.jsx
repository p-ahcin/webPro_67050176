import { Link, NavLink, Outlet } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'

export default function AdminLayout() {
    const navClass = ({ isActive }) =>
        `btn btn-ghost justify-start ${isActive ? 'btn-active' : ''}`

    return (
        <div className="min-h-screen bg-base-200 text-base-content">
            <header className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <Link
                        to="/admin/dashboard"
                        className="btn btn-ghost text-xl"
                    >
                        MiniShop Admin
                    </Link>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <ThemeToggle />
                    <Link to="/" className="btn btn-outline btn-sm">
                        Back to Shop
                    </Link>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 md:grid-cols-[220px_minmax(0,1fr)] md:p-6">
                <aside>
                    <nav
                        aria-label="Admin navigation"
                        className="flex flex-col gap-2 rounded-box bg-base-100 p-4 shadow-sm"
                    >
                        <NavLink to="/admin/dashboard" className={navClass}>
                            Dashboard
                        </NavLink>

                        <NavLink to="/admin/products" className={navClass}>
                            Products
                        </NavLink>
                    </nav>
                </aside>

                <main className="min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}