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
import RutasDetail1 from '@/moduloAdministrador/components/rutas/RutasDetailDetalles'
import RutasDetail3 from '@/moduloAdministrador/components/rutas/RutasDetailParametros'
import RutasDetail4 from '@/moduloAdministrador/components/rutas/RutasDetailRespuestas'

export default {
  data () {
    return {
      tabItems: [
        {
          title: 'Detalles',
          icon: 'styles'
        },
        {
          title: 'Parametros',
          icon: 'keyboard_capslock'
        },
        {
          title: 'Respuestas',
          icon: 'keyboard_return'
        }
      ],
      information: {
        title: 'Ruta?',
        description: 'Sin descripción'
      },
      aditionals: {
        Vista: 'Administrador'
      },
      spinner: true,
      selectedComponent: 'Detalles'
    }
  },
  components: {
    iopTabs,
    Detalles: RutasDetail1,
    Parametros: RutasDetail3,
    Respuestas: RutasDetail4,
    InformationBar
  }
}
</script>
