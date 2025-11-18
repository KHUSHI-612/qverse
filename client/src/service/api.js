import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_BASE || 'https://qverse-5.onrender.com';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000 
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('qverse_auth');
  if (raw) {
    try {
      const { token } = JSON.parse(raw);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {}
  }
  return config;
});


