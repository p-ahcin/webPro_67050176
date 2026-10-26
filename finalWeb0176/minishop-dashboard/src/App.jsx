import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Profile from './pages/Profile.jsx'
import Dashboard from './pages/Dashboard.jsx'
import About from './pages/About.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<Profile />} />
        <Route path="about" element={<About />} />
        <Route path="admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="admin/dashboard" element={<Dashboard />} />
        <Route path="admin/products" element={<Products management />} />
        <Route
          path="*"
          element={
            <section className="panel">
              <h1 className="text-3xl font-bold">404 — ไม่พบหน้านี้</h1>
              <Link className="btn mt-4" to="/">
                กลับหน้าหลัก
              </Link>
            </section>
          }
        />
      </Route>
    </Routes>
  )
}
