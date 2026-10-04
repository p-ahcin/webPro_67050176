import Icon from './Icon.jsx'

const money = (amount) => `฿${Number(amount).toLocaleString('en-US', { maximumFractionDigits: 2 })}`

export default function ProductCard({ name, price, image, category, rating, onAdd, onDetail }) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="grid aspect-square place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-blue-100">
        <img src={image} alt={name} loading="lazy" className="h-full w-full object-contain p-5" />
      </div>
      <p className="mt-3 text-xs capitalize text-blue-600">{category}</p>
      <h2 className="mt-1 line-clamp-2 min-h-12 font-bold text-slate-800">{name}</h2>
      <p className="mt-1 font-bold text-slate-900">{money(price)}</p>
      <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
        <span className="text-amber-400"><Icon name="star" className="h-4 w-4 fill-current" /></span>
        {rating?.rate ?? '—'} ({rating?.count ?? 0})
      </p>
      <div className="mt-auto grid gap-2 pt-3">
        <button onClick={onAdd} className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">Add to Cart</button>
        <button onClick={onDetail} className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">View Detail</button>
      </div>
    </article>
  )
}

export { money }
