// src/api/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // or wherever your backend runs
    withCredentials: true,
});

export default instance;
