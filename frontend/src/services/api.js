import axios from 'axios';

// In production on Netlify, /api/* is redirected to the serverless function
// on the same domain — no CORS issues, no separate backend URL needed.
// In local dev, Vite proxy handles /api → localhost:5001.
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for clear error formatting
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'Something went wrong',
      status: error.response?.status,
      errors: error.response?.data?.errors,
    };
    return Promise.reject(customError);
  }
);

export default api;
