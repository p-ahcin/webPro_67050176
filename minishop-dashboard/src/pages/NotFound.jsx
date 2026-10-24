import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="rounded-xl bg-white p-8 text-center shadow-sm">
      <p className="text-6xl font-bold text-blue-600">404</p>

      <h1 className="mt-4 text-2xl font-bold text-slate-800">
        Page not found
      </h1>

      <p className="mt-2 text-slate-600">
        ไม่พบหน้าที่คุณต้องการ
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </section>
  )
}