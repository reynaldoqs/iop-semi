//fix: Si hace un request a la pagina, lanzara error por q no tiene el token seteado
import Axios from 'axios'
import { BASE_URL } from "../config/config.js";
Axios.defaults.baseURL = BASE_URL;
let token = JSON.parse(localStorage.getItem("user")).accesos.token;
Axios.defaults.headers.common["Authorization"] = token;
console.log(BASE_URL);