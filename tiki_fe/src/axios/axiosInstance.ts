import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.PUBLIC_API_URL || 'http://localhost:3003', // Replace with your actual base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  },
);

export default axiosInstance;
