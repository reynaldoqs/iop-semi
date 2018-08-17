<template>
  <div >
    <div class="inter-card-container inter-container">
      <information-bar style="margin-bottom:30px"
      :information="information"
      :aditionals="aditionals"
      />
      <search-bar isSearch isPaginationControl v-on:onSearch="search" v-on:changeSize="changeResults">
        <span style="color:var(--ds-txt-2);font-weight:300">Solo se puede agregar rutas a partir de un <router-link to="servicios" style="font-style:italic;color:var(--ds-bg-1)">servicio</router-link> creado.</span>
      </search-bar>
      <div class="iop-spinner-container" v-if="spinner">
        <v-progress-circular :size="50" color="blue-grey darken-3" indeterminate></v-progress-circular>
      </div>
      <div class="my-auto-x-scroll" v-else>
         <data-table-view tipo="rutas" :datos="requestData" v-on:onUpdatePagination="updatePagination"></data-table-view>
      </div>
    </div>
  </div>
</template>

<script>
import InformationBar from '@/moduloAdministrador/components/shared/InformationBar'
import ActionAndSearchBar from '@/moduloAdministrador/components/shared/ActionAndSearchBar'
import rutasApi from '@/services/rutasService'
import DataTableView from '@/moduloAdministrador/components/shared/DataTableView'
export default {
  data () {
    return {
      spinner: true,
      requestData: {},
      information: {
        title: 'Rutas',
        description: 'Muestra todas las rutas registradas en la plataforma.'
      },
      aditionals: {
        registrados: 0
      }
    }
  },
  methods: {
    updatePagination (pagination) {
      // console.log(`Tienes que hacer funcionar la paginación: ${pagination}`);
    },
    changeResults (value) {
      this.loadRutas(value)
    },
    search (query) {
      this.spinner = true
      rutasApi.searchRuta(query).then(data => {
        this.requestData = this.formatData(data)
        this.spinner = false
      })
    },
    formatData (data) {
      // Formatea lo datos para enviarlos al data table(formato unico).
      let headers = ['Nombre Ruta', 'Versión', 'URL base', 'Método', 'Acción']
      return {
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
    },
    loadRutas (limite = 10) {
      this.spinner = true
      rutasApi.getRutas(limite).then(data => {
        this.aditionals.registrados = data.totalrutas
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
    this.loadRutas()
  }
}
</script>
