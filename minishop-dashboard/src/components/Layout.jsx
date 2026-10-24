import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 p-4">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white p-4 text-center text-sm text-slate-500">
        © MiniShop — React Routing Lab
      </footer>
    </div>
  )
}