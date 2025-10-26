import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Products API
export const productsAPI = {
  getAll: () => api.get('/products/'),
  getBySlug: (slug) => api.get(`/products/${slug}/`),
  getById: (id) => api.get(`/products/id/${id}/`),
  getByCategory: (categorySlug) => api.get(`/categories/${categorySlug}/products/`),
}

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories/'),
  getBySlug: (slug) => api.get(`/categories/${slug}/`),
}

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart/'),
  addToCart: (productId, quantity = 1) => api.post('/cart/add/', { product_id: productId, quantity }),
  updateCartItem: (itemId, quantity) => api.put(`/cart/items/${itemId}/`, { quantity }),
  removeFromCart: (itemId) => api.delete(`/cart/items/${itemId}/`),
  clearCart: () => api.delete('/cart/clear/'),
}

export default api
