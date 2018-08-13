<template>
  <div class="side-var-view">
    <div class="user-info" v-bind:class="{active: isUserAuthenticated}">
      <div class="top-options">
        logo
      </div>
    </div>
    <v-list class="my-list left-bar">
        
        <iopToolTip v-for="(link, i) in links" :key="i"  :title="link.title" :description="'Haga click visualizar '+link.title" right>
        <v-list-tile  :to="link.to">
                        <v-list-tile-action>
            <v-icon v-html="link.icon"></v-icon>
          </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="iop-link-list-title">{{link.title}}</v-list-tile-title>
          <small class="list-information">{{link.description}}</small>
        </v-list-tile-content>
         </v-list-tile>
        </iopToolTip>
        
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import iopToolTip from "@/moduloAdministrador/components/shared/iopToolTip";
export default {
  data() {
    return {
      userLinks: [
        {
          icon: "cloud_queue",
          title: "Servicios",
          to: "/dashboard/servicios",
          description: "Servicios habilitados"
        },
        {
          icon: "equalizer",
          title: "Estadísticas",
          to: "/dashboard/estadisticas",
          description: "Estadísticas de la plataforma"
        },
        {
          icon: "list",
          title: "Catálogo",
          to: "/dashboard/catalogo-servicios",
          description: "Catálogo de servicios"
        }
      ],

      adminlinks: [
        {
          icon: "equalizer",
          title: "Estadísticas",
          to: "/dashboard/estadisticas",
          description: "Estadísticas de la plataforma"
        },
        {
          icon: "people_outline",
          title: "Usuarios",
          to: "/admin/usuarios",
          description: "Usuarios registrados"
        },
        {
          icon: "cast_connected",
          title: "Ambientes",
          to: "/admin/ambientes",
          description: "Ambientes registrados"
        },
        {
          icon: "cloud_queue",
          title: "Servicios",
          to: "/admin/servicios",
          description: "Servicios registrados"
        },
        {
          icon: "call_split",
          title: "Rutas",
          to: "/admin/rutas",
          description: "Rutas de la plataforma"
        },
        {
          icon: "account_balance",
          title: "Entidades",
          to: "/admin/entidades",
          description: "Entidades registradas"
        },
        {
          icon: "description",
          title: "Noticias",
          to: "/admin/noticias",
          description: "Noticias de la plataforma"
        }
      ]
    };
  },
  methods: {
    changeToUser() {
      document.documentElement.style.setProperty("--ds-bg-1", "#ec6d64");
      return this.userLinks;
    },
    changeToAdmin() {
      document.documentElement.style.setProperty("--ds-bg-1", "#009688");
      return this.adminlinks;
    }
  },
  computed: {
    ...mapGetters(["user", "isUserAuthenticated"]),
    links() {
      return this.user.rol === "ADMINISTRADOR"
        ? this.changeToAdmin()
        : this.changeToUser();
    }
  },
  components: {
    iopToolTip
  }
};
</script>

<style scoped>
.my-list {
  background-color: transparent !important;
}

.theme--dark .icon {
  color: #516161;
  position: relative;
}

.top-options {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.iop-link-list-title {
  font-size: 1rem;
}
.list-information {
  font-size: 10px;
  line-height: 8px;
  color: #819191;
  font-style: italic;
}
</style>
