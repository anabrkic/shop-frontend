import Axios from 'axios';

export const axios = Axios.create({
    baseURL: 'http://localhost:4000/',
});

axios.interceptors.request.use(
    function(config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);
