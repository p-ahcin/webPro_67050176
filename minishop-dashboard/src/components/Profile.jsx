import Icon from './Icon.jsx'

export default function Profile({ cartCount }) {
  const summary = [
    ['Cart Items', cartCount, 'cart', 'bg-blue-50 text-blue-600'],
    ['Member Type', 'Student', 'user', 'bg-violet-50 text-violet-600'],
  ]

  return (
    <section>
      <h1 className="mb-5 text-2xl font-bold text-slate-900">Profile</h1>
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-blue-100 text-blue-600"><Icon name="user" className="h-11 w-11" /></div>
          <h2 className="mt-4 text-xl font-bold text-slate-900">Alex Student</h2>
          <p className="mt-4 flex items-center justify-center gap-3 text-sm text-slate-600"><Icon name="mail" /> alex@email.com</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">Account Summary</h2>
          <div className="grid grid-cols-2 gap-3">
            {summary.map(([label, value, icon, color]) => (
              <div key={label} className={`rounded-xl p-4 ${color}`}>
                <span className="mb-3 grid h-9 w-9 place-items-center rounded-full bg-white/70"><Icon name={icon} /></span>
                <p className="text-xs font-medium text-slate-600">{label}</p>
                <p className="mt-1 text-xl font-bold text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
