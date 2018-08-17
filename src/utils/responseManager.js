import notificationsApi from '@/utils/showNotification'
import msgApi from '@/config/getMessages'
export default {
  verifyPetition (data) {
    console.log('llegamos aqui thhtp', data)
    if (typeof data !== 'undefined' || data !== null) {
      let status = data.status
      let statusMessage = msgApi.statusCode(status) || 'no message'
      if (status >= 200 && status < 300) {
        statusMessage === 'no message' ? ''
          : notificationsApi.showSuccessful(statusMessage)
        return {
          isOk: true,
          answer: data.data
        }
      } else {
        let errorMsg = data.data.error ? data.data.error : `Error sin mensaje, status: ${status}`
        notificationsApi.showError(errorMsg)
        return {
          isOk: false,
          answer: data.data
        }
      }
    } else {
      notificationsApi.showError('No existe una respuesta del servidor')
      return {
        isOk: false,
        answer: 'Sin respuesta'
      }
    }
  }
}
