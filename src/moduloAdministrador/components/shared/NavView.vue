<template>
  <v-toolbar app light>
    <v-toolbar-side-icon @click.stop="changeDrawer"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <!-- Aqui las opciones del menu-->
    </v-toolbar-items>
    <v-spacer></v-spacer>

      <div  v-if="isLoggedIn" class="user-container">
        <div class="user-notifications">
          <news-component></news-component>

        </div>

        <v-avatar :tile="tile" :size="avatarSize">
          <img :src="`https://api.adorable.io/avatar/80/${user.rol}`">
        </v-avatar>
        <div class="user-information">
        <h3 class="user-name">
          <span class="nombre">{{user.nombres}}</span>
          <span class="apellido">{{user.primerApellido}}</span>
        </h3>
        <p class="user-rol">{{user.rol}}</p>
        </div>
        <v-menu bottom left transition="slide-y-transition">
          <v-btn slot="activator" icon>
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click.stop="settings('change-pass')">
              <v-list-tile-action>
                <v-icon color="white" small>settings</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title style="font-size:14px">Cambiar contraseña</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile @click="logout">
              <v-list-tile-action>
                <v-icon color="white" small>block</v-icon>
              </v-list-tile-action>
              <v-list-tile-title style="font-size:14px">Salir</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    <div v-else>
      <v-btn outline round flat @click="toLoginPage">Login</v-btn>
    </div>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'
import EventBus from '@/utils/eventBus'
import NewsComponent from '@/moduloAdministrador/components/notificaciones/NewsComponent'
export default {
  data () {
    return {
      avatarSize: 45,
      tile: false
    }
  },
  props: ['isLoggedIn'],
  methods: {
    settings (item) {
      EventBus.$emit('settings', item)
    },
    changeDrawer () {
      this.$emit('changeDrawer')
    },
    logout () {
      this.$emit('onLogout')
    },
    toLoginPage () {
      this.$emit('toLoginPage')
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  components: {
    NewsComponent
  }
}
</script>

<style scoped>
.user-notifications {
  margin-right: 25px;
}
.user-notifications > i {
  font-size: 30px;
  color: var(--ds-bg-1) !important;
}
.application .theme--dark.v-icon,
.theme--dark .v-icon {
  color: var(--ds-txt-4);
}
.nav-view {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-container {
  display: inline-flex;
  align-items: center;
}
.user-information {
  padding: 25px 0 15px 10px;
}
.user-name {
  line-height: 16px;
  font-size: 1.1rem;
  color: var(--ds-txt-4);
  margin: 10px 0 0 0;
}
.nombre {
  text-transform: lowercase;
  display: inline-block;
  margin-right: 5px;
}
.nombre::first-letter {
  text-transform: uppercase;
}
.apellido {
  text-transform: lowercase;
  display: inline-block;
}
.apellido::first-letter {
  text-transform: uppercase;
}
.user-rol {
  color: var(--ds-bg-1);
  text-transform: lowercase;
  font-size: 0.8rem;
}

.user-rol::first-letter {
  text-transform: uppercase;
}
</style>
