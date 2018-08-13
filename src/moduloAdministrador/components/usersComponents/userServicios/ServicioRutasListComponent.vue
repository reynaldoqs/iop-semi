<template>
  <div>
      <div class="inter-card-container inter-container">
        <div class="iop-spinner-container" v-if="spinner">
          <v-progress-circular :size="50" color="blue-grey darken-3" indeterminate></v-progress-circular>
        </div>
        <div class="my-auto-x-scroll" v-else>
          <data-table :headers="headers" :items="rutas"/>
        </div>
      </div>
  </div>
</template>

<script>
import dataTable from "@/moduloAdministrador/components/usersComponents/userRutas/UserRutasDataTableView";
import serviciosApi from "@/services/serviciosService";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      notifications: false,
      spinner: false,
      rutas: [],
      headers: [
        {
          title: "Datos de la ruta"
        },
        {
          title: "Url base"
        },
        {
          title: "Estado"
        },
        {
          title: "Respuestas"
        },
        {
          title: "Acciones"
        }
      ],
      errorMessage: "",
      showError: false
    };
  },
  mounted() {
    this.spinner = true;
    if (this.user.id) {
      serviciosApi.getRutas(this.$route.params.id).then(data => {
        this.rutas = data.rutas;
        this.spinner = false;
      });
    } else {
      this.$store.dispatch("notification", {
        message: "Error con el usuario",
        dangerous: true
      });
    }
  },
  components: {
    dataTable
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>
