import axios from 'axios'
import notificationApi from '@/utils/showNotification'
export default {
  getEntidades (limit = 10, page = 1) {
    return axios
      .get(`/entidades?limite=${limit}&pagina=${page}`)
      .then(data => {
        return data.data
      })
      .catch(err => {
        let error = err.response.data.error
        notificationApi.showError(error)
        return error
      })
  },
  getEntidad (id) {
    return axios
      .get(`/entidades/${id}`)
      .then(data => {
        return data.data
      })
      .catch(err => {
        let error = err.response.data.error
        notificationApi.showError(error)
        return error
      })
  },
  patchEntidad (id, data) {
    return axios
      .patch(`/entidades/${id}`, data)
      .then(data => {
        return data.data
      })
      .catch(err => {
        let error = err.response.data.error
        notificationApi.showError(error)
      })
  },
  searchEntidad (query) {
    return axios
      .get(`/entidades?palabraClave=${query}`)
      .then(data => {
        return data.data
      })
      .catch(err => {
        let error = err.response.data.error
        notificationApi.showError(error)
        return error
      })
  },
  postEntidad (data) {
    return axios
      .post(`/entidades`, data)
      .then(data => {
        notificationApi.showSuccessful('Entidad creada!')
        return data.data
      })
      .catch(err => {
        let error = err.response.data.error
        notificationApi.showError(error)
      })
  }
}
