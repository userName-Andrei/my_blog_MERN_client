import axios from 'axios';

// пользовательская конфигурация
const instance = axios.create({
    baseURL: 'http://localhost:4000/'
});

// перехват запроса перед отправкой на сервер и добавление в заголовок токена
instance.interceptors.request.use(config => {
    config.headers.authorization = window.localStorage.getItem('token');

    return config;
})

export default instance;