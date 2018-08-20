import axios from 'axios'
import notificationApi from '@/utils/showNotification'
export default {
  serviceLogin(creds) {
    console.log(creds)
    return axios
      .post('/auth', creds)
      .then(data => {
        console.log(data)
        return data.data
      })
      .catch(err => {
        console.log(err.response)
        return err.response.data.error
      })
  },
  serviceRestPassword(idChange, data) {
    return axios
      .post(`/auth/${idChange}/cambiarClave`, data, {
        'Content-type': 'application/x-www-form-urlencoded'
      })
      .then(() => {
        notificationApi.showSuccessful('Contraseña camabiada')
      })
      .catch(err => {
        notificationApi.showError(err.response.data.error)
      })
  }
}
