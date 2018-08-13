import axios from "axios";
import notificationApi from "@/utils/showNotification";
export default {
  getUsuarios(limit = 10, page = 1) {
    return axios
      .get(`/usuarios?limite=${limit}&pagina=${page}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  getRutas(id, limit = 10, page = 1) {
    return axios
      .get(`/usuarios/${id}/rutas?limite=${limit}&pagina=${page}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  getUsuario(id) {
    return axios
      .get(`/usuarios/${id}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  patchUsuario(id, data) {
    return axios
      .patch(`/usuarios/${id}`, data)
      .then(data => {
        notificationApi.showSuccessful("Modificado correctamente");
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
      });
  },
  searchUsuario(query) {
    return axios
      .get(`/usuarios?palabraClave=${query}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  validarUsuario(data) {
    return axios
      .post(`/usuarios/contrastar`, data)
      .then(data => {
        notificationApi.showSuccessful("Usuario valido");
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        //no retornamos error, para que nuestro validador funcione
      });
  },
  postUsuario(data) {
    return axios
      .post(`/usuarios`, data)
      .then(data => {
        notificationApi.showSuccessful("Usuario creado correctamente");
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
      });
  }
};
