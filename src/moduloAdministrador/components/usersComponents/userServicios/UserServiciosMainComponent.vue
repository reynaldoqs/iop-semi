<template>
  <div>
      <div class="inter-card-container inter-container">
        <formInformation title="Lista de servicios habilitados" description="Muestra la lista de servicios habilitados en la plataforma.">

        </formInformation>
        <div class="iop-spinner-container" v-if="spinner">
          <v-progress-circular :size="50" color="blue-grey darken-3" indeterminate></v-progress-circular>
        </div>
        <div class="my-auto-x-scroll" v-else>
          <data-table :headers="headers" :items="servicios"/>
        </div>
      </div>
  </div>
</template>
<script>
import dataTable from "@/moduloAdministrador/components/usersComponents/userServicios/UserServiciosDataTableView";
import serviciosApi from "@/services/serviciosService";
import formInformation from "@/moduloAdministrador/components/shared/formComponents/formInformationBar";

export default {
  data() {
    return {
      notifications: false,
      spinner: false,
      servicios: [],
      headers: [
        { title: "Servicio" },
        { title: "Entidad propietaria" },
        { title: "Código" },
        { title: "Estado" },
        { title: "Ambientes" },
        { title: "Acciones" }
      ]
    };
  },
  mounted() {
    this.spinner = true;
    serviciosApi.getServicios().then(data => {
      this.servicios = data.servicios;
      this.spinner = false;
    });
  },
  components: {
    dataTable,
    formInformation
  }
};
</script>
