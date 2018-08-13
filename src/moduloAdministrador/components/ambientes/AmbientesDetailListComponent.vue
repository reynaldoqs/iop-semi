<template>
         <div class="iop-card">
           <v-btn flat outline @click.stop="modalCreateServicio"><v-icon left>add</v-icon>Agregar un Servicio</v-btn>
            <data-table-view  deep tipo="servicios" :loading="loading" :datos="requestData"></data-table-view>
         </div>
</template>

<script>
import ambientesApi from "@/services/ambientesService";
import DataTableView from "@/moduloAdministrador/components/shared/DataTableView";
import EventBus from "@/utils/eventBus";

export default {
  data() {
    return {
      requestData: {},
      loading: true
    };
  },
  components: {
    DataTableView
  },
  methods: {
    callApi() {
      this.loading = true;
      ambientesApi
        .getServicios(this.$route.params.id)
        .then(data => this.formatData(data));
    },
    formatData(data) {
      let headers = [
        "Nombre del Servicio",
        "Sigla Entidad",
        "Código",
        "Estado",
        "Acción"
      ];
      this.requestData = {
        totalItems: data.totalServicios,
        items: data.servicios.map(data => {
          let formated = {
            data1: data.nombre,
            data2: data.datosEntidad.siglaEntidad,
            data3: data.codigo,
            data4: data.estado,
            id: data.id
          };
          return formated;
        }),
        headers: headers.map(data => {
          let header = {
            text: data,
            align: "left",
            sortable: true
          };
          return header;
        })
      };
      this.loading = false;
    },
    modalCreateServicio() {
      EventBus.$emit("open-lg-modal", "create-servicio");
    }
  },
  mounted() {
    this.callApi();
    EventBus.$on("refresh-from-modal", () => {
      this.callApi();
    });
  },
  beforeDestroy() {
    EventBus.$off("refresh-from-modal");
  }
};
</script>
