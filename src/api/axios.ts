// src/api/axios.ts
import axios from 'axios';

const API = axios.create({
    baseURL:
        import.meta.env.VITE_API_BASE_URL
        || 'http://localhost:3000',
});

// Add a request interceptor to attach the JWT token to each request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;