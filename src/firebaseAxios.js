import axios from 'axios';

const firebaseAxios = axios.create({
    baseURL: 'https://myowecloud-default-rtdb.firebaseio.com',
});

const getLogin = () => localStorage.getItem('firebaseLogin');

export const getConfiguration = () => firebaseAxios.get(`/users/${getLogin()}.json`);


export const saveConfiguration = configuration => firebaseAxios.put(`/users/${getLogin()}.json`, configuration);

