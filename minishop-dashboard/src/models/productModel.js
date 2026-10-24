import sampleProducts from '../sampleProducts.js'

const products = sampleProducts.map((product, index) => ({
  ...product,
  id: index + 1,
}))

export function getProducts() {
  return products
}

export function getProductById(id) {
  return products.find((product) => product.id === Number(id))
}