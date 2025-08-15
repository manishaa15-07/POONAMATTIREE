import axios from 'axios';

// Use local backend for development, production URL as fallback
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = isDevelopment
    ? 'http://localhost:5000/api'
    : 'https://poonamattiree.vercel.app';

console.log('🔧 Environment:', isDevelopment ? 'Development' : 'Production');
console.log('🔧 API URL:', API_URL);

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if it exists
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔐 Token attached:', token.substring(0, 20) + '...'); // ✅ log it
        console.log('🔐 Request URL:', config.url);
        console.log('🔐 Request method:', config.method);
    } else {
        console.warn('⚠️ No token found in localStorage');
    }
    return config;
});


// Auth API calls
export const authAPI = {
    login: (credentials) => api.post('/users/login', credentials),
    register: (userData) => api.post('/users/register', userData),
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.patch('/users/profile', data),
    changePassword: (data) => api.post('/users/change-password', data)
};

// Products API calls
export const productsAPI = {
    getAll: (params) => api.get('/products', { params }),
    getById: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.patch(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`)
};

// Cart API calls
export const cartAPI = {
    get: () => api.get('/cart'),
    add: (item) => api.post('/cart', item),
    updateQuantity: (id, { quantity }) => api.put(`/cart/${id}`, { quantity }),
    remove: (id) => api.delete(`/cart/${id}`),
    clear: () => api.post('/cart/clear')
};

// Orders API calls
export const ordersAPI = {
    create: (data) => api.post('/orders', data),
    getMyOrders: () => api.get('/orders/my-orders'),
    getOrder: (id) => api.get(`/orders/${id}`),
    updateStatus: (id, data) => api.patch(`/orders/${id}/status`, data)
};

// Wishlist API calls
export const wishlistAPI = {
    getWishlist: () => api.get('/users/wishlist'),
    addToWishlist: (productId) => api.post(`/users/wishlist/add/${productId}`),
    removeFromWishlist: (productId) => api.delete(`/users/wishlist/remove/${productId}`),
};

export default api; 