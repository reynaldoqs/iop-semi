<template>
  <div>
    <v-list subheader two-line light>
      <v-subheader light>Rutas asociadas</v-subheader>
  
      <v-list-tile @click.stop="selectRuta(index)" v-for="(ruta,index) in arrayRutas" :key="index">
        <v-list-tile-action light>
          <v-checkbox v-model="ruta.active"></v-checkbox>
        </v-list-tile-action>
  
        <v-list-tile-content>
          <v-list-tile-title>{{ruta.nombre}} <span style="color:var(--inter-primary); font-size:.7rem; font-weight:700; position:relative; top:-8px">{{ruta.metodo}}</span></v-list-tile-title>
          <v-list-tile-sub-title style="line-height:0.9rem; font-size:1rem">{{ruta.descripcion}}</v-list-tile-sub-title>
         <!--  <v-list-tile-sub-title style="line-height:0.9rem; font-size:0.9rem">{{ruta.baseUrl}} - <span style="color:#7E57C2">{{ruta.metodo}}</span> </v-list-tile-sub-title> -->
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrayRutas: []
    };
  },
  props: {
    rutasServicio: Array,
    idAmbiente: String,
    rutasUsuario: Array
  },
  methods: {
    selectRuta(index) {
      this.arrayRutas[index].active = !this.arrayRutas[index].active;
      this.$emit("onSelect", this.arrayRutas);
      //Revisar, en algunos casos se bugea aqui al momento de cambiar el estado de check
    },
    checkIfIsActive(rutaId) {
      if (this.idAmbiente) {
        let result = this.rutasUsuario.some(
          ruta => ruta.idRuta === rutaId && ruta.idAmbiente === this.idAmbiente
        );
        return result;
      }
    }
  },
  mounted() {
    this.arrayRutas = this.rutasServicio.map(ruta => {
      let rutaFormada = {
        nombre: ruta.nombre,
        descripcion: ruta.descripcion,
        baseUrl: ruta.baseUrl,
        metodo: ruta.metodo,
        idRuta: ruta.id,
        active: this.checkIfIsActive(ruta.id)
      };
      return rutaFormada;
    });
  }
};
</script>
