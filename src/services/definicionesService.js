import axios from "axios";
import notificationApi from "@/utils/showNotification";
export default {
  getDefiniciones(limit = 10, page = 1) {
    return axios
      .get(`/definiciones?limite=${limit}&pagina=${page}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  getDefinicion(id) {
    return axios
      .get(`/definiciones/${id}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  patchDefinicion(id, data) {
    return axios
      .patch(`/definiciones/${id}`, data)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
        return error;
      });
  },
  searchDefinicion(query) {
    return axios
      .get(`/definiciones?palabraClave=${query}`)
      .then(data => {
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
      });
  },
  postDefinicion(data) {
    return axios
      .post(`/definiciones`, data)
      .then(data => {
        notificationApi.showSuccessful("Definición Guardada");
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
      });
  },
  deleteDefinicion(id) {
    return axios
      .delete(`/definiciones/${id}`)
      .then(data => {
        notificationApi.showSuccessful("Definición Borrada");
        return data.data;
      })
      .catch(err => {
        let error = err.response.data.error;
        notificationApi.showError(error);
      });
  }
};
