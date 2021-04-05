import axios from 'axios';
import {formatDate, saveLogin} from './shared/commonFunction';

const owenAxios = axios.create({
    baseURL: 'https://api.owencloud.ru',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export const getToken = (login, password) => {
    return owenAxios.post('/v1/auth/open', {
        login: login,
        password: password,
    })
        .then(resp => {
            saveLogin(login, password);
            setToken(resp.data.token);
        });
}

export const getDeviceList = () => {
    return owenAxios.post('/v1/device/index', {});
}

export const getValuesForParameters = (parameters) => {
    return owenAxios.post('/v1/parameters/last-data', {ids: parameters.map(param => param.id)});
}

export const getDeviceDescriptions = (id) => {
    return owenAxios.post(`/v1/device/${id}`, {});
}

export const deleteToken = () => {
    owenAxios.defaults.headers.common['Authorization'] = '';
}

export const setToken = (token) => {
    owenAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export async function getValuesForChart() {
    const date = new Date();
    const startDate = new Date(date - (60 * 60 * 1000));
    return owenAxios.post(`/v1/parameters/data`,
        {
            'ids': [6408738, 6408728],
            'start': formatDate(startDate),
            'end': formatDate(date),
            'step': 1
        })
        .then(
            resp => resp.data.map(({id, values}) => (
                {
                    label: id,
                    data: values.map(({d, v}) => ({primary: d * 1000, secondary: v}))
                }
            )))
        .catch(err => Promise.reject(err));
}

export const setInterceptor = () => {
    owenAxios.interceptors.response.use(
        resp => resp,
        error => {
            const originalRequest = error.config;
            console.log(originalRequest.url);
            if (error.response.status === 401 && originalRequest.url !== '/v1/auth/open') {
                if (localStorage.getItem('login') && localStorage.getItem('password')) {
                    return getToken(localStorage.getItem('login'), localStorage.getItem('password'))
                        .then(() => owenAxios(originalRequest));
                }
            }
            return Promise.reject(error);
        }
    );
}

