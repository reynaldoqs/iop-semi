<template>
         <div class="iop-card">
           <v-btn flat outline @click="abrirSteeper"><v-icon left>add</v-icon>Agregar una Ruta</v-btn>
            <data-table-view deep tipo="rutas" :loading="loading" :datos="requestData"></data-table-view>
         </div>
</template>

<script>
import serviciosApi from '@/services/serviciosService'
import DataTableView from '@/moduloAdministrador/components/shared/DataTableView'
import EventBus from '@/utils/eventBus'

export default {
  data () {
    return {
      requestData: {},
      loading: true
    }
  },
  components: {
    DataTableView
  },
  methods: {
    abrirSteeper () {
      EventBus.$emit('open-modal')
      EventBus.$emit(
        'set-modal-data',
        { icon: 'directions', description: 'Proceso para crear una ruta' },
        'Crear ruta'
      )
    },
    callApi () {
      this.loading = true
      // para obtener las rutas asociadas al servicio
      serviciosApi.getRutas(this.$route.params.id).then(data => {
        this.formatData(data)
      })
    },
    formatData (data) {
      // mejorar con graphql...
      let headers = ['Nombre Ruta', 'Versión', 'URL base', 'Método', 'Acción']
      this.requestData = {
        totalItems: data.totalrutas,
        items: data.rutas.map(data => {
          let formated = {
            data1: data.nombre,
            data2: data.version,
            data3: data.baseUrl,
            data4: data.metodo,
            id: data.id
          }
          return formated
        }),
        headers: headers.map(data => {
          let header = {
            text: data,
            align: 'left',
            sortable: true
          }
          return header
        })
      }
      this.loading = false
    }
  },
  mounted () {
    this.callApi()
    EventBus.$on('refresh-from-modal', () => {
      this.callApi()
    })
  },
  beforeDestroy () {
    EventBus.$off('refresh-from-modal')
  }
}
</script>
