import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: '/api',  
});

api.interceptors.request.use(
  config => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log(`Request to ${config.url} with payload:`, config.data);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    console.log(`Response from ${response.config.url}:`, response.data);
    return response;
  },
  error => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

const apis = {
  insertUser: payload => api.post('/users', payload),
  getAllUsers: () => api.get('/users'),
  updateUserById: (id, payload) => api.put(`/users/${id}`, payload),
  deleteUserById: id => api.delete(`/users/${id}`),
  getUserById: id => api.get(`/users/${id}`),
  loginUser: credentials => api.post('/auth', credentials),
};

export default apis;
