import Vue from 'vue'
import store from './store'
import { App } from './app'
import { router } from './router'

import '@/plugins/element.js'
import '@/plugins/particles.js'
import '@/plugins/axios.js'
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
