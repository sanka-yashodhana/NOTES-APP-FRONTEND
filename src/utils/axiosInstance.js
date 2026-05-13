import axios from 'axios';
import { BASE_URL } from './constants.js';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
)

export default axiosInstance;