const API_URL = 'http://localhost:3001/products'

async function request(url, options = {}) {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`เรียก API ไม่สำเร็จ (${response.status})`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export function getProducts() {
  return request(API_URL)
}

export function createProduct(product) {
  return request(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
}

export function updateProduct(id, product) {
  return request(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
}

export function deleteProduct(id) {
  return request(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}