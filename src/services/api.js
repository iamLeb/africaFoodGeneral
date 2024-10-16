import axios from 'axios';

// console.log(import.meta.env);
const api = axios.create({
    baseURL: import.meta.env.VITE_CORS,
    withCredentials: true // Send cookies with cross-origin requests
});

export default api;