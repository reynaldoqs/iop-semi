<template>
  <div>
    <div class="inter-card-container inter-container">
      <information-bar style="margin-bottom:20px"
      :information="information"
      :aditionals="aditionals"
      />
      <div class="iop-spinner-container" v-if="spinner">
          <v-progress-circular
            :size="50"
            color="blue-grey darken-3"
            indeterminate
          ></v-progress-circular>
      </div>
      <div class="iop-main-tabs" v-else>
        <iop-tabs :items="tabItems" v-on:selectTab="(data) => selectedComponent = data">
          <component :is="selectedComponent" :selectedUser="selectedUser"/>
        </iop-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import iopTabs from "@/moduloAdministrador/components/shared/iopTabs";
import usuariosApi from "@/services/usuariosService";
import InformationBar from "@/moduloAdministrador/components/shared/InformationBar";
import usuarioDetailPersonal from "@/moduloAdministrador/components/usuarios/UsuarioDetailPersonal";
import usuarioDetailInstitucional from "@/moduloAdministrador/components/usuarios/UsuarioDetailInstitucional";
import usuariosRoutesListComponent from "@/moduloAdministrador/components/usuarios/UsuariosRoutesListComponent";
export default {
  data() {
    return {
      tabItems: [
        {
          title: "Personal",
          icon: "person"
        },
        {
          title: "Institucional",
          icon: "public"
        },
        {
          title: "Rutas",
          icon: "call_split"
        }
      ],
      information: {
        title: "user?",
        description:
          "El objeto Consumer representa un consumidor, o un usuario, de una API."
      },
      aditionals: {
        rutas: 0,
        entidad: "n/a"
      },
      spinner: true,
      selectedComponent: "Personal"
    };
  },
  components: {
    iopTabs,
    Personal: usuarioDetailPersonal,
    Institucional: usuarioDetailInstitucional,
    Rutas: usuariosRoutesListComponent,
    InformationBar
  },
  mounted() {
    this.spinner = true;
    usuariosApi.getUsuario(this.$route.params.id).then(data => {
      this.information.title = data.usuario;
      this.aditionals.rutas = data.rutas !== null ? data.rutas.length : 0;
      this.aditionals.entidad = data.datosEntidad.siglaEntidad;
      this.selectedUser = data;
      this.spinner = false;
    });
  }
};
</script>
