import axios from 'axios'
import notificationApi from '@/utils/showNotification'
export default {
  getCatalogos (limit = 10, page = 1) {
    return axios
      .get(`/catalogo?limite=${limit}&pagina=${page}`)
      .then(data => {
        return data.data
      })
      .catch(err => {
        let error = err.response.data.error
        notificationApi.showError(error)
      })
  },
  getCatalogo (catalogo) {
    return axios
      .get(`/catalogo/${catalogo}`)
      .then(data => {
        return data.data
      })
      .catch(err => {
        let error = err.response.data.error
        notificationApi.showError(error)
      })
  },
  searchCatalogo (query) {
    return axios
      .get(`/catalogo?palabraClave=${query}`)
      .then(data => {
        return data.data
      })
      .catch(err => {
        let error = err.response.data.error
        notificationApi.showError(error)
      })
  }
}
