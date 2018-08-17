<template>
  <div >
    <div class="inter-card-container inter-container">
      <information-bar style="margin-bottom:30px"
      :information="information"
      :aditionals="aditionals"
      />
      <search-bar isSearch isPaginationControl v-on:onSearch="search" v-on:changeSize="changeResults">
        <v-btn color="teal" @click.stop="modalAddServicio"><v-icon left>add</v-icon> Agregar un Servicio</v-btn>
      </search-bar>
      <div class="iop-spinner-container" v-if="spinner">
        <v-progress-circular :size="50" color="blue-grey darken-3" indeterminate></v-progress-circular>
      </div>
      <div class="my-auto-x-scroll" v-else>
         <data-table-view tipo="servicios" :datos="requestData" v-on:onUpdatePagination="updatePagination"></data-table-view>
      </div>
    </div>
  </div>
</template>

<script>
import InformationBar from '@/moduloAdministrador/components/shared/InformationBar'
import ActionAndSearchBar from '@/moduloAdministrador/components/shared/ActionAndSearchBar'
import serviciosApi from '@/services/serviciosService'
import DataTableView from '@/moduloAdministrador/components/shared/DataTableView'
import EventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      spinner: true,
      requestData: {},
      information: {
        title: 'Servicios',
        description: 'Muestra todos los servicios registrados en la plataforma.'
      },
      aditionals: {
        registrados: 0
      }
    }
  },
  methods: {
    modalAddServicio () {
      EventBus.$emit('open-modal')
      EventBus.$emit(
        'set-modal-data',
        {
          icon: 'cloud_queue'
        },
        'Registrar servicio',
        600
      )
    },
    updatePagination (pagination) {
      // console.log(`Tienes que hacer funcionar la paginación: ${pagination}`);
    },
    changeResults (value) {
      this.loadServicios(value)
    },
    search (query) {
      this.spinner = true
      serviciosApi.searchServicio(query).then(data => {
        this.requestData = this.formatData(data)
        this.spinner = false
      })
    },
    formatData (data) {
      // Formatea lo datos para enviarlos al data table(formato unico).
      let headers = [
        'Nombre del Servicio',
        'Sigla Entidad',
        'Código',
        'Estado',
        'Dar de Baja'
      ]
      return {
        totalItems: data.totalServicios,
        items: data.servicios.map(data => {
          let formated = {
            data1: data.nombre,
            data2: data.datosEntidad.siglaEntidad,
            data3: data.codigo,
            data4: data.estado,
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
    },
    loadServicios (limite = 10) {
      this.spinner = true
      serviciosApi.getServicios().then(data => {
        this.aditionals.registrados = data.totalServicios
        this.requestData = this.formatData(data)
        this.spinner = false
      })
    }
  },
  components: {
    'search-bar': ActionAndSearchBar,
    InformationBar,
    DataTableView
  },
  mounted () {
    this.loadServicios()
    EventBus.$on('refresh-from-modal', () => {
      this.loadServicios()
    })
  },
  beforeDestroy () {
    EventBus.$off('refresh-from-modal')
  }
}
</script>
