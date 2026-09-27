import './style.css'
import backpackImage from './assets/backpack.jpg'
import headphoneImage from './assets/headphone.jpeg'
import laptopImage from './assets/macbook_air.jpg'
import smartWatchImage from './assets/smart_watch.png'

const icons = {
  home: `
    <path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <path d="M9 21v-6h6v6"/>
  `,
  box: `
    <path d="m21 16-9 5-9-5V8l9-5 9 5z"/>
    <path d="m3.3 7.8 8.7 5 8.7-5M12 22V12.8"/>
  `,
  user: `
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 21a8 8 0 0 1 16 0"/>
  `,
  search: `
    <circle cx="11" cy="11" r="6"/>
    <path d="m20 20-4.2-4.2"/>
  `,
  cart: `
    <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H7"/>
    <circle cx="10" cy="21" r="1"/>
    <circle cx="18" cy="21" r="1"/>
  `,
  mail: `
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <path d="m3 7 9 6 9-6"/>
  `,
  edit: `
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/>
  `,
  star: `
    <path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.7l6.2-.9z"/>
  `,
  dollar: `
    <line x1="12" x2="12" y1="2" y2="22"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  `,
}

const icon = (name, classes = 'h-5 w-5') => `
  <svg
    class="${classes} shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    ${icons[name]}
  </svg>
`

const products = [
  {
    name: 'Laptop',
    price: '฿12,900',
    rating: '4.3 (24)',
    image: laptopImage,
    color: 'from-slate-100 to-blue-100',
  },
  {
    name: 'Headphones',
    price: '฿1,290',
    rating: '4.3 (18)',
    image: headphoneImage,
    color: 'from-blue-100 to-indigo-100',
  },
  {
    name: 'Backpack',
    price: '฿890',
    rating: '4.7 (32)',
    image: backpackImage,
    color: 'from-sky-100 to-blue-50',
  },
  {
    name: 'Smart Watch',
    price: '฿2,990',
    rating: '4.4 (20)',
    image: smartWatchImage,
    color: 'from-slate-100 to-gray-200',
  },
]

let view = 'dashboard'
let cartCount = 2
let searchTerm = ''

function navItem(id, label, iconName) {
  const activeClass =
    view === id
      ? 'bg-blue-50 text-blue-600 shadow-sm'
      : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'

  return `
    <button
      data-view="${id}"
      class="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${activeClass}"
    >
      ${icon(iconName)}
      <span>${label}</span>
    </button>
  `
}

function header() {
  return `
    <header class="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-7">
      <button data-view="dashboard" class="text-xl font-bold tracking-tight text-blue-600">
        MiniShop
      </button>

      <div class="flex items-center gap-4 text-slate-700">
        <button class="rounded-lg p-2 hover:bg-slate-100" aria-label="Search">
          ${icon('search')}
        </button>

        <button id="cart-button" class="relative rounded-lg p-2 hover:bg-slate-100" aria-label="Cart">
          ${icon('cart')}
          <span class="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
            ${cartCount}
          </span>
        </button>

        <div class="grid h-8 w-8 place-items-center rounded-full bg-slate-400 text-sm font-bold text-white">
          A
        </div>
      </div>
    </header>
  `
}

function dashboard() {
  const metrics = [
    ['Total Products', '24', 'box', 'bg-blue-100 text-blue-600'],
    ['Orders', '128', 'cart', 'bg-emerald-100 text-emerald-600'],
    ['Revenue', '฿48,500', 'star', 'bg-violet-100 text-violet-600'],
  ]

  const rows = [
    ['1', '2025-09-15', 'Somchai J.', '3', '฿1,260', 'Completed', 'bg-emerald-100 text-emerald-700'],
    ['2', '2025-09-14', 'Nattaya K.', '1', '฿520', 'Processing', 'bg-blue-100 text-blue-700'],
    ['3', '2025-09-13', 'Kritsada P.', '2', '฿980', 'Shipped', 'bg-violet-100 text-violet-700'],
    ['4', '2025-09-12', 'Piyaporn S.', '1', '฿450', 'Completed', 'bg-emerald-100 text-emerald-700'],
    ['5', '2025-09-11', 'Thanawat C.', '4', '฿1,800', 'Pending', 'bg-amber-100 text-amber-700'],
  ]

  return `
    <section>
      <h1 class="mb-5 text-2xl font-bold text-slate-900">Dashboard</h1>

      <div class="grid gap-3 sm:grid-cols-3">
        ${metrics
          .map(
            ([label, value, name, color]) => `
              <article class="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                <div class="flex items-center gap-3">
                  <span class="grid h-11 w-11 place-items-center rounded-full ${color}">
                    ${icon(name)}
                  </span>
                  <div>
                    <p class="text-xs font-medium text-slate-600">${label}</p>
                    <p class="mt-1 text-2xl font-bold ${label === 'Revenue' ? 'text-violet-600' : 'text-slate-800'}">
                      ${value}
                    </p>
                  </div>
                </div>
              </article>
            `,
          )
          .join('')}
      </div>

      <article class="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 class="mb-3 text-lg font-bold text-slate-800">Recent Orders</h2>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[570px] text-left text-xs">
            <thead class="bg-slate-50 text-slate-600">
              <tr>
                ${['#', 'Date', 'Customer', 'Items', 'Total', 'Status']
                  .map((heading) => `<th class="px-2 py-2 font-semibold">${heading}</th>`)
                  .join('')}
              </tr>
            </thead>
            <tbody>
              ${rows
                .map(
                  (row) => `
                    <tr class="border-b border-slate-100 last:border-0">
                      ${row
                        .slice(0, 5)
                        .map((cell) => `<td class="px-2 py-2.5 text-slate-700">${cell}</td>`)
                        .join('')}
                      <td class="px-2 py-2.5">
                        <span class="rounded-md px-2 py-1 text-[11px] font-medium ${row[6]}">
                          ${row[5]}
                        </span>
                      </td>
                    </tr>
                  `,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  `
}

function productCard(product) {
  return `
    <article class="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div class="grid aspect-square place-items-center overflow-hidden rounded-lg bg-gradient-to-br ${product.color}">
        <img src="${product.image}" alt="${product.name}" class="h-full w-full object-contain p-2">
      </div>
      <h2 class="mt-3 font-bold text-slate-800">${product.name}</h2>
      <p class="mt-1 font-bold text-slate-900">${product.price}</p>
      <p class="mt-2 flex items-center gap-1 text-xs text-slate-500">
        <span class="text-amber-400">${icon('star', 'h-4 w-4 fill-current')}</span>
        ${product.rating}
      </p>
      <button data-add="${product.name}" class="mt-3 w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
        Add to Cart
      </button>
    </article>
  `
}

function productPage() {
  const shown = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const productCards = shown.map(productCard).join('') || '<p class="col-span-full rounded-xl bg-white p-6 text-center text-slate-500">No products found.</p>'

  return `
    <section>
      <h1 class="mb-4 text-2xl font-bold text-slate-900">Products</h1>

      <div class="mb-4 grid gap-3 md:grid-cols-[1fr_190px]">
        <label class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-slate-400 shadow-sm">
          ${icon('search')}
          <input id="product-search" value="${searchTerm}" class="w-full py-2.5 text-sm text-slate-700 outline-none" placeholder="Search products...">
        </label>
        <select class="rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Accessories</option>
        </select>
      </div>

      <div id="product-grid" class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        ${productCards}
      </div>
    </section>
  `
}

function profile() {
  const summary = [
    ['Total Orders', '128', 'cart', 'bg-blue-50 text-blue-600'],
    ['Total Spent', '฿48,500', 'dollar', 'bg-violet-50 text-violet-600'],
    ['Wishlist Items', '6', 'box', 'bg-emerald-50 text-emerald-600'],
    ['Loyalty Points', '320', 'star', 'bg-amber-50 text-amber-600'],
  ]

  return `
    <section>
      <h1 class="mb-5 text-2xl font-bold text-slate-900">Profile</h1>

      <div class="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <article class="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div class="mx-auto grid h-20 w-20 place-items-center rounded-full bg-blue-100 text-blue-600">
            ${icon('user', 'h-11 w-11')}
          </div>
          <h2 class="mt-4 text-xl font-bold text-slate-900">Alex Student</h2>
          <div class="mt-4 space-y-3 text-left text-sm text-slate-600">
            <p class="flex items-center gap-3">${icon('mail', 'h-5 w-5')} alex@email.com</p>
            <p class="flex items-center gap-3">${icon('box', 'h-5 w-5')} Student ID: 6501234567</p>
          </div>
          <button id="edit-profile" class="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            ${icon('edit', 'h-4 w-4')}
            Edit Profile
          </button>
        </article>

        <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 class="mb-4 text-lg font-bold text-slate-800">Account Summary</h2>
          <div class="grid grid-cols-2 gap-3">
            ${summary
              .map(
                ([label, value, name, color]) => `
                  <div class="rounded-xl p-4 ${color}">
                    <span class="mb-3 grid h-9 w-9 place-items-center rounded-full bg-white/70">
                      ${icon(name)}
                    </span>
                    <p class="text-xs font-medium text-slate-600">${label}</p>
                    <p class="mt-1 text-xl font-bold text-slate-800">${value}</p>
                  </div>
                `,
              )
              .join('')}
          </div>
        </article>
      </div>
    </section>
  `
}

function addCartListeners() {
  document.querySelectorAll('[data-add]').forEach((button) => {
    button.addEventListener('click', () => {
      cartCount += 1
      button.textContent = 'Added!'
      button.classList.replace('bg-blue-600', 'bg-emerald-600')
      setTimeout(render, 550)
    })
  })
}

function render() {
  const page = view === 'dashboard' ? dashboard() : view === 'products' ? productPage() : profile()

  document.querySelector('#app').innerHTML = `
    <main class="min-h-screen bg-slate-50 p-3 sm:p-5">
      <div class="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-xl shadow-slate-200/60">
        ${header()}
        <div class="flex min-h-[620px]">
          <aside class="hidden w-40 shrink-0 border-r border-slate-200 bg-white p-2 sm:block">
            <nav class="space-y-1">
              ${navItem('dashboard', 'Dashboard', 'home')}
              ${navItem('products', 'Products', 'box')}
              ${navItem('profile', 'Profile', 'user')}
            </nav>
          </aside>
          <div class="flex-1 bg-slate-50 p-4 sm:p-6">${page}</div>
        </div>
        <nav class="flex justify-around border-t border-slate-200 bg-white p-2 sm:hidden">
          ${navItem('dashboard', 'Home', 'home')}
          ${navItem('products', 'Products', 'box')}
          ${navItem('profile', 'Profile', 'user')}
        </nav>
      </div>
    </main>
  `

  document.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', () => {
      view = button.dataset.view
      render()
    })
  })

  addCartListeners()

  document.querySelector('#product-search')?.addEventListener('input', (event) => {
    searchTerm = event.target.value
    const shown = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const productCards = shown.map(productCard).join('') || '<p class="col-span-full rounded-xl bg-white p-6 text-center text-slate-500">No products found.</p>'

    document.querySelector('#product-grid').innerHTML = productCards
    addCartListeners()
  })

  document.querySelector('#cart-button').addEventListener('click', () => {
    alert(`You have ${cartCount} items in your cart.`)
  })

  document.querySelector('#edit-profile')?.addEventListener('click', () => {
    alert('Edit Profile clicked')
  })
}

render()
