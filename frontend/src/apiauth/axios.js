import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7276',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request config:', config); // Log the config to verify the token is included
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
