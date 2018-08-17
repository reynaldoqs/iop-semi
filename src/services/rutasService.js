import axios from 'axios'
import notificationApi from '@/utils/showNotification'
export default {
  getRutas (limit = 10, page = 1) {
    return axios
      .get(`/rutas?limite=${limit}&pagina=${page}`)
      .then(data => {
        return data.data
      })
      .catch(err => {
        let error = err.response.data.error
        notificationApi.showError(error)
        return error
      })
  },
  getRuta (id) {
    return axios
      .get(`/rutas/${id}`)
      .then(data => {
        return data.data
      })
      .catch(err => {
        let error = err.response.data.error
        notificationApi.showError(error)
        return error
      })
  },
  patchRuta (id, data) {
    return axios
      .patch(`/rutas/${id}`, data)
      .then(data => {
        notificationApi.showSuccessful('Ruta modificada')
        return data.data
      })
      .catch(err => {
        let error = err.response.data.error
        notificationApi.showError(error)
      })
  },
  searchRuta (query) {
    return axios
      .get(`/rutas?palabraClave=${query}`)
      .then(data => {
        return data.data
      })
      .catch(err => {
        let error = err.response.data.error
        notificationApi.showError(error)
        return error
      })
  },
  postRuta (data) {
    return axios
      .post(`/rutas`, data)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  // para los parametros
  getParametro (idRuta, idParametro) {
    return axios
      .get(`/rutas/${idRuta}/parametros/${idParametro}`)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  getParametros (idRuta, limit = 100, page = 1) {
    return axios
      .get(`/rutas/${idRuta}/parametros?limite=${limit}&pagina=${page}`)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  patchParametro (idRuta, idParametro, data) {
    return axios
      .patch(`/rutas/${idRuta}/parametros/${idParametro}`, data)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  postParametro (idRuta, data) {
    return axios
      .post(`/rutas/${idRuta}/parametros`, data)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  deleteParametro (idRuta, idParametro) {
    return axios
      .delete(`/rutas/${idRuta}/parametros/${idParametro}`)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  /// peticiones para las respuestass
  postCodRespuesta (idRuta, data) {
    return axios
      .post(`/rutas/${idRuta}/respuestas`, data)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  deleteCodRespuesta (idRuta, idRespuesta) {
    return axios
      .delete(`/rutas/${idRuta}/respuestas/${idRespuesta}`)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  patchCodRespuesta (idRuta, idRespuesta, data) {
    return axios
      .patch(`/rutas/${idRuta}/respuestas/${idRespuesta}`, data)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  getCodsRespuestas (idRuta) {
    return axios
      .get(`/rutas/${idRuta}/respuestas`)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  postRespuesta (idRespuesta, data) {
    return axios
      .post(`/respuestas/${idRespuesta}/parametros`, data)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  getRespuestas (idRespuesta, limit = 100, page = 1) {
    return axios
      .get(`/respuestas/${idRespuesta}/parametros?limite=${limit}&pagina=${page}`)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  getRespuesta (idRespuesta, idParametro) {
    return axios
      .get(`/respuestas/${idRespuesta}/parametros/${idParametro}`)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  deleteRespuesta (idRespuesta, idParametro) {
    return axios
      .delete(`/respuestas/${idRespuesta}/parametros/${idParametro}`)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  deleteRespuesta (idRespuesta, idParametro) {
    return axios
      .delete(`/respuestas/${idRespuesta}/parametros/${idParametro}`)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  },
  patchRespuesta (idRespuesta, idParametro, data) {
    return axios
      .patch(`/respuestas/${idRespuesta}/parametros/${idParametro}`, data)
      .then(data => {
        return data
      })
      .catch(err => {
        return err.response
      })
  }
}
