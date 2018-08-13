import axios from "axios";
import notificationApi from "@/utils/showNotification";
import fechas from "@/utils/getFechas";
let URL = 'http://172.29.0.101/api-logdata/consumer/jarteaga-mindesprod-probolivia.imp-fun-seg/estadisticas?fechaConsulta';

export default {
  getLine(fecha = '') {

    let newUrl = fecha === '' ? `${URL}=${fechas.todayInv()}` : `${URL}=${fecha}`;
    return axios({
      method: 'get',
      url: newUrl
    }).then(data => {
      return data.data;
    }).catch(err => {
      let error = err.response.data.error;
      notificationApi.showError(error);
    })
  }
}
