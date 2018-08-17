import { DO_NOTIFICATION, CLOSE_NOTIFICATION } from '../actions/notifications'

const state = {
  snackbarOn: false,
  dangerous: false,
  time: 0,
  message: ''
}

const getters = {
  isOn: state => state.snackbarOn,
  dangerous: state => state.dangerous,
  time: state => state.time,
  message: state => state.message
}
const mutations = {
  [DO_NOTIFICATION]: (state, information) => {
    state.message = information.message
    state.dangerous = information.dangerous || false
    state.time = information.time || 1000
    state.snackbarOn = true
  },
  [CLOSE_NOTIFICATION]: state => {
    state.message = ''
    state.time = 0
    state.dangerous = false
    state.snackbarOn = false
  }
}

const actions = {
  notification: (context, information) => {
    context.commit(DO_NOTIFICATION, information)
    setTimeout(() => {
      context.commit(CLOSE_NOTIFICATION)
    }, state.time)
  },
  closeNotification: context => {
    context.commit(CLOSE_NOTIFICATION)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
