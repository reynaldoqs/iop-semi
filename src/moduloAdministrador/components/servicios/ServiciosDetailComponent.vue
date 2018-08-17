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
import iopTabs from '@/moduloAdministrador/components/shared/iopTabs'
import InformationBar from '@/moduloAdministrador/components/shared/InformationBar'
import ServiciosDetailView from '@/moduloAdministrador/components/servicios/ServiciosDetailViewComponent'
import ServiciosDetailRoutes from '@/moduloAdministrador/components/servicios/ServiciosDetailListComponent'
export default {
  data () {
    return {
      tabItems: [
        {
          title: 'Detalles',
          icon: 'styles'
        },
        {
          title: 'Rutas',
          icon: 'call_split'
        }
      ],
      information: {
        title: 'Servicio?',
        description: 'Sin descripcion'
      },
      aditionals: {
        Vista: 'Administrador'
      },
      selectedComponent: 'Detalles'
    }
  },
  components: {
    iopTabs,
    Detalles: ServiciosDetailView,
    Rutas: ServiciosDetailRoutes,
    InformationBar
  }
}
</script>
