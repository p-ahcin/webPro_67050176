import Icon from './Icon.jsx'

export default function Header({ cartCount, onHome, onCart }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-7">
      <button onClick={onHome} className="text-xl font-bold tracking-tight text-blue-600">MiniShop</button>
      <div className="flex items-center gap-4 text-slate-700">
        <button onClick={onCart} className="relative rounded-lg p-2 hover:bg-slate-100" aria-label={`Cart, ${cartCount} items`}>
          <Icon name="cart" />
          <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">{cartCount}</span>
        </button>
        <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-400 text-sm font-bold text-white" aria-hidden="true">A</div>
      </div>
    </header>
  )
}
