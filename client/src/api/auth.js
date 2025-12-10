import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const loginUser = (email, password) => {
  return axiosInstance.post('/login', { email, password });
};

export const registerUser = (name, email, password) => {
  return axiosInstance.post('/register', { name, email, password });
};

export const getProfile = () => {
  return axiosInstance.get('/profile');
};

export const changePassword = (currentPassword, newPassword) => {
  return axiosInstance.post('/change-password', { currentPassword, newPassword });
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export default axiosInstance;