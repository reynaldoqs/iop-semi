//fix: Si hace un request a la pagina, lanzara error por q no tiene el token seteado
import Vue from 'vue'
import Axios from 'axios'
import { BASE_URL } from "../config/config.js"
import store from "@/store/index"

Axios.defaults.baseURL = BASE_URL;
Axios.defaults.headers.common.Accept = 'application/json';
Axios.interceptors.response.use(
    response => response,
    (error) => {
        if (error.response.status === 401) {
            store.dispatch('logout');
        }
        return Promise.reject(error);
    },
);
if (store.getters['isAuthenticated']) {
    let token = JSON.parse(localStorage.getItem("user")).accesos.token;
    Axios.defaults.headers.common["Authorization"] = token;
}
