import axios from "axios";
import notificationApi from "@/utils/showNotification";
export default {
  getServicios(limit = 10, page = 1) {
    return axios
      .get(`/servicios?limite=${limit}&pagina=${page}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  getRutas(id) {
    return axios
      .get(`/servicios/${id}/rutas`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
      });
  },
  getServicio(id) {
    return axios
      .get(`/servicios/${id}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  patchServicio(id, data) {
    return axios
      .patch(`/servicios/${id}`, data)
      .then(data => {
        notificationApi.showSuccessful("Servicio modificado correctamente");
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  searchServicio(query) {
    return axios
      .get(`/servicios?palabraClave=${query}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  postServicio(data) {
    return axios
      .post(`/servicios`, data)
      .then(data => {
        notificationApi.showSuccessful("Servicio guardado correctamente");
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  }
};
