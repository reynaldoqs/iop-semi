<template>
  <div>
    <div class="inter-card-container inter-container">
      <formInformation title="Información de la ruta" description="Muestra los detalles de la ruta, datos generales y su información técnica.">
          asd
        </formInformation>
      <div class="iop-main-tabs">
        <iop-tabs :items="tabItems" v-on:selectTab="(data) => selectedComponent = data">
          <component :is="selectedComponent"/>
        </iop-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import iopTabs from '@/moduloAdministrador/components/shared/iopTabs'
import formInformation from '@/moduloAdministrador/components/shared/formComponents/formInformationBar'
import UserDetailRutasCatalogo from '@/moduloAdministrador/components/usersComponents/userRutas/UserDetailRutasCatalogo'
export default {
  data () {
    return {
      tabItems: [
        {
          title: 'Detalles',
          icon: 'info'
        }
      ],
      selectedComponent: 'Detalles'
    }
  },
  components: {
    iopTabs,
    Detalles: UserDetailRutasCatalogo,
    formInformation
  }
}
</script>
