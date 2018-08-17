<template>
  <div>
      <div class="inter-card-container inter-container">

        <search-bar isSearch isPaginationControl v-on:onSearch="search" v-on:changeSize="changeResults">
          <formInformation title="Lista de servicios habilitados" description="Muestra la lista de servicios habilitados en la plataforma."/>
        </search-bar>

        <div class="iop-spinner-container" v-if="spinner">
          <v-progress-circular :size="50" color="blue-grey darken-3" indeterminate></v-progress-circular>
        </div>
        <div class="catalogos-container" v-else>
          <div class="iop-ficha" v-for="(ficha, index) in fichas" :key="index">

            <div @click="$router.push({ name: 'detail-catalogo', params: { num: `${ficha.datosGenerales.identificador}` }})" class="iop-ficha-contend">

              <div class="avatar-container" :style="{backgroundColor:assingColor(ficha.datosGenerales.propietario)}">
                <v-avatar
                size="45"
                color="grey lighten-4"
              >
                imagen
              </v-avatar>
              </div>
              {{ficha.datosGenerales.propietario}}
              <p>{{ficha.datosGenerales.descripcion}}</p>
            </div>
          </div>

        </div>
      </div>
  </div>
</template>
<script>
import ActionAndSearchBar from '@/moduloAdministrador/components/shared/ActionAndSearchBar'
import catalogosApi from '@/services/catalogosService'
import formInformation from '@/moduloAdministrador/components/shared/formComponents/formInformationBar'
import colors from '@/utils/getColors'

export default {
  data () {
    return {
      spinner: true,
      fichas: {}
    }
  },
  methods: {
    search (query) {
      this.spinner = true
      catalogosApi.searchCatalogo(query).then(data => {
        if (data) {
          this.fichas = data.fichas
          this.spinner = false
        }
      })
    },
    changeResults (value) {
      this.loadCatalogos(value)
    },
    loadCatalogos (limite = 10) {
      this.spinner = true
      catalogosApi.getCatalogos(limite).then(data => {
        if (data) {
          this.fichas = data.fichas
          this.spinner = false
        }
      })
    },
    assingColor (name) {
      return colors.getRgba(name, 0.9)
    },
    formatCatalogo (catalogo) {
      return Object.assign({ catalogo }, { imgUrl: '' })
    }
  },
  mounted () {
    this.loadCatalogos()
  },
  components: {
    formInformation,
    'search-bar': ActionAndSearchBar
  }
}
</script>
<style scoped>
.catalogos-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 16px;
}
.avatar-container {
  padding: 3px;
  display: inline-block;
  border-radius: 50%;
  width: auto;
  margin-right: 10px;
  margin-bottom: 10px;
}
.iop-ficha {
  background-color: var(--ds-bg-2);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}
.iop-ficha-contend {
  padding: 16px;
  cursor: pointer;
}
</style>
