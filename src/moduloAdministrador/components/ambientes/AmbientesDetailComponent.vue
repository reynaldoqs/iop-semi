<template>
  <div>
    <div class="inter-card-container inter-container">
      <information-bar style="margin-bottom:20px"
      :information="information"
      :aditionals="aditionals"
      />
      <div class="iop-main-tabs">
        <iop-tabs :items="tabItems" v-on:selectTab="(data) => selectedComponent = data">
          <component :is="selectedComponent" v-on:selectedComp="(data) => {information.description = data.subtitulo; information.title = data.titulo;}"/>
        </iop-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import iopTabs from "@/moduloAdministrador/components/shared/iopTabs";
import InformationBar from "@/moduloAdministrador/components/shared/InformationBar";
import AmbientesDetailViewComponent from "@/moduloAdministrador/components/ambientes/AmbientesDetailViewComponent";
import AmbientesDetailListComponent from "@/moduloAdministrador/components/ambientes/AmbientesDetailListComponent";
export default {
  data() {
    return {
      tabItems: [
        {
          title: "Detalles",
          icon: "styles"
        },
        {
          title: "Servicios",
          icon: "cloud"
        }
      ],
      information: {
        title: "ambiente?",
        description: "sin descripcion"
      },
      aditionals: {
        Vista: "Administrador"
      },
      spinner: true,
      selectedComponent: "Detalles"
    };
  },
  components: {
    iopTabs,
    Detalles: AmbientesDetailViewComponent,
    Servicios: AmbientesDetailListComponent,
    InformationBar
  }
};
</script>
