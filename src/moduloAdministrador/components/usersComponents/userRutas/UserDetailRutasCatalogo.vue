<template>
  <div class="servicios-detail-user">
    <div class="iop-spinner-container" v-if="spinner">
        <v-progress-circular :size="50" color="blue-grey darken-3" indeterminate></v-progress-circular>
    </div>
    <v-layout row wrap style="max-width:800px" v-else>
      <v-flex xs12>
        <div class="main-title">
           Datos generales
        </div>
      </v-flex>
      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          Indicador:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          {{catalogo.datosGenerales.identificador}}
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          Versión:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          {{catalogo.datosGenerales.version}}
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          Descripción:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          {{catalogo.datosGenerales.descripcion}}
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
         Fecha de inicio de disponibilidad:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          <span v-bind:class="{'iop-no-resuts':(catalogo.datosGenerales.fechaFinDisponibilidad === '')}">
          {{catalogo.datosGenerales.fechaInicioDisponibilidad ===''||catalogo.datosGenerales.fechaInicioDisponibilidad === null?'Sin fecha de inicio de disponibilidad':catalogo.datosGenerales.fechaInicioDisponibilidad }}
          </span>
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
         Fecha de inicio de disponibilidad:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          <span v-bind:class="{'iop-no-resuts':(catalogo.datosGenerales.fechaFinDisponibilidad === '')}">
            {{catalogo.datosGenerales.fechaFinDisponibilidad ===''||catalogo.datosGenerales.fechaFinDisponibilidad === null?'Sin fecha de final de disponibilidad':catalogo.datosGenerales.fechaFinDisponibilidad }}
          </span>
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
         Propietario:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          {{catalogo.datosGenerales.propietario}}
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
         Fichas asociadas:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          <span class="iop-no-resuts" v-show="catalogo.datosGenerales.fichasAsociadas.length === 0">
            Sin fichas asociadas
          </span>
          <span class="bat-palabras" v-for="(item, index) in catalogo.datosGenerales.fichasAsociadas" :key="index">
            {{item.prefijoOperacion}}
          </span>
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
         Palabras clave:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          <span class="iop-no-resuts" v-show="catalogo.datosGenerales.palabrasClave.length === 0">
            Sin palabras clave
          </span>
          <span class="bat-palabras" v-for="(item, index) in catalogo.datosGenerales.palabrasClave" :key="index">
            {{item}}
          </span>
        </div>
      </v-flex>

      <v-flex xs12>
         <v-divider style="margin: 3px 0 15px 0"></v-divider>
      </v-flex>

      <v-flex xs12>
        <div class="main-title">
           Información técnica
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          URL:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          {{catalogo.informacionTecnica.url}}
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          Tipo:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          {{catalogo.informacionTecnica.tipo}}
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
         Entorno(s):
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          <span class="iop-no-resuts" v-show="catalogo.informacionTecnica.entorno.length === 0">
            Sin fichas asociadas
          </span>
          <span class="bat-palabras" v-for="(item, index) in catalogo.informacionTecnica.entorno" :key="index">
            {{item}}
          </span>
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          Políticas de seguridad:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          {{catalogo.informacionTecnica.politicasSeguridad}}
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          Tipo de autenticación:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          {{catalogo.informacionTecnica.tipoAutenticacion}}
        </div>
      </v-flex>

    </v-layout>
  </div>
</template>
<script>
import catalogosApi from '@/services/catalogosService'
export default {
  name: 'catalogo-detail-route',
  data () {
    return {
      spinner: true,
      catalogo: {}
    }
  },
  mounted () {
    catalogosApi.getCatalogo(this.$route.params.num).then(data => {
      if (data) {
        this.catalogo = data
        this.spinner = false
      }
    })
  }
}
</script>

<style scoped>
.main-title {
  padding: 5px 5px 5px 25px;
  font-size: 1.4rem;
  color: var(--ds-txt-2);
}
.servicios-detail-user {
  padding-top: 10px;
}
.bat-padding {
  padding: 3px 5px;
}
.bat-title {
  font-weight: 400;
  color: var(--ds-txt-5);
  padding-left: 10px;
  margin: 0 0 6px 0;
  text-align: right;
  font-size: 1.1rem;
}

.bat-container {
  padding: 1px 10px 10px 10px;
  border-radius: 3px;
  position: relative;
  font-size: 1.1rem;
  font-weight: 300;
}
.bat-size-1 {
  font-size: 1.4rem;
  font-weight: 700;
}
.bat-size-2 {
  font-size: 1.1rem;
  font-weight: 700;
}
.bat-palabras:not(:last-child)::after {
  content: ",";
  color: var(--inter-secondary);
  position: relative;
  left: -2px;
}
</style>
