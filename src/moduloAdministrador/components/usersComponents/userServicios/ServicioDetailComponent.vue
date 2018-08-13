<template>
  <div class="servicios-detail-user">
    <div class="iop-spinner-container" v-if="spinner">
        <v-progress-circular :size="50" color="blue-grey darken-3" indeterminate></v-progress-circular>
    </div>
    <v-layout row wrap v-else style="max-width:800px">

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          Nombre del servicio:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container bat-size-1">
          {{servicio.nombre}}
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          Descripción del servicio:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          {{servicio.descripcion}}
        </div>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          Código del servicio:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          {{servicio.codigo}}
        </div>
      </v-flex>
      <v-flex xs12>
         <v-divider style="margin: 3px 0 15px 0"></v-divider>
      </v-flex>

      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          Estado:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          {{servicio.estado}}
        </div>
      </v-flex>
      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          Palabras clave:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          <span class="bat-palabras" v-for="(palabra, index) in servicio.palabrasClave" :key="index">
            {{palabra}}
          </span>
        </div>
      </v-flex>
      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          Versión:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">
          {{servicio.version}}
        </div>
      </v-flex>
      <v-flex xs12>
         <v-divider style="margin: 3px 0 15px 0"></v-divider>
      </v-flex>
      <v-flex xs4 class="bat-padding">
        <div class="bat-title">
          Entidad propietaria:
        </div>
      </v-flex>
      <v-flex xs8 class="bat-padding">
        <div class="bat-container">    
          {{servicio.datosEntidad.siglaEntidad}} - {{servicio.datosEntidad.descripcionEntidad}}
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import serviciosApi from "@/services/serviciosService";
export default {
  data() {
    return {
      spinner: true,
      servicio: {}
    };
  },
  methods: {
    loadServicio() {
      this.spinner = true;
      serviciosApi.getServicio(this.$route.params.id).then(data => {
        this.servicio = data;
        this.spinner = false;
      });
    }
  },
  mounted() {
    this.loadServicio();
  }
};
</script>
<style scoped>
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
