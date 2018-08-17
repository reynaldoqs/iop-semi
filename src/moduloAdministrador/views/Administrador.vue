<template>
    <v-app dark>
  <v-navigation-drawer
    width="220"
    persistent
    enable-resize-watcher
    fixed
    app
    style="background-color:var(--ds-bg-2)"
    :mini-variant="!drawer"
  >
    <SideBarComponent/>
    </v-navigation-drawer>
    <NavComponent v-on:changeDrawer="changeDrawer" />
    <v-content>
      <router-view/>
    </v-content>
      <v-footer
    dark
    app
    absolute
    inset
    height="150px"
  >
      <iopFooter/>
    </v-footer>
    </v-app>
</template>
<script>
import '../../plugins/vuetify.js'
import axios from 'axios'
import { BASE_URL } from '@/config/config.js'
import LgModalMainComponent from '@/moduloAdministrador/components/modals/largeModals/LgModalMainComponent'
import NotificationsComponent from '@/moduloAdministrador/components/notificaciones/NotificationsComponent'
import SideBarComponent from '@/moduloAdministrador/components/shared/SideBarComponent'
import NavComponent from '@/moduloAdministrador/components/shared/NavComponent'
import iopFooter from '@/moduloAdministrador/components/shared/FooterComponent'
export default {
  name: 'app',
  data: () => ({
    drawer: true
  }),
  created () {
    // hacer un archivo para configurar los defaults de axios
    axios.defaults.baseURL = BASE_URL
    /*   axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded"; */
    // configurando la autorizacion de axios si el usuario esta en el storage
    if (
      this.$store.getters.isUserAuthenticated &&
      localStorage.getItem('user')
    ) {
      let token = JSON.parse(localStorage.getItem('user')).accesos.token
      axios.defaults.headers.common['Authorization'] = token
    }
  },
  methods: {
    changeDrawer () {
      this.drawer = !this.drawer
      // mejorar el drawer
    }
  },
  components: {
    modal: LgModalMainComponent,
    notifications: NotificationsComponent,
    SideBarComponent,
    NavComponent,
    iopFooter
  }
}
</script>
