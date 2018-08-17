<template>
  <div>
    <div class="inter-card-container inter-container">
      <formInformation title="Detalles del servicio" description="Muestra los detalles del servicio, la documentación del servicio y las rutas asociadas al servicio, rutas que puede ser consumidas por el usuario.">
          <v-breadcrumbs>
            <v-icon slot="divider">chevron_right</v-icon>

            <v-breadcrumbs-item
              v-for="item in navigation"
              :disabled="item.disabled"
              :key="item.text"
            >
              {{ item.text }}
            </v-breadcrumbs-item>
          </v-breadcrumbs>
        </formInformation>
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
import formInformation from '@/moduloAdministrador/components/shared/formComponents/formInformationBar'
import ServicioRutasListaComponent from '@/moduloAdministrador/components/usersComponents/userServicios/ServicioRutasListComponent'
import ServicioDetailComponent from '@/moduloAdministrador/components/usersComponents/userServicios/ServicioDetailComponent'
export default {
  data () {
    return {
      tabItems: [
        {
          title: 'Detalles',
          icon: 'info'
        },
        {
          title: 'Rutas',
          icon: 'person'
        }
      ],
      selectedComponent: 'Detalles',
      navigation: [
        {
          text: 'Dashboard',
          disabled: false
        },
        {
          text: 'Servicios',
          disabled: false
        },
        {
          text: 'Detalles',
          disabled: true
        }
      ]
    }
  },
  components: {
    iopTabs,
    Rutas: ServicioRutasListaComponent,
    Detalles: ServicioDetailComponent,
    formInformation
  }
}
</script>
