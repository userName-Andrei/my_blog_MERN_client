import axios from 'axios';

// пользовательская конфигурация
const instance = axios.create({
    baseURL: 'https://my-blog-mern-server.onrender.com/'
});

// перехват запроса перед отправкой на сервер и добавление в заголовок токена
instance.interceptors.request.use(config => {
    config.headers.authorization = window.localStorage.getItem('token');

    return config;
})

export default instance;