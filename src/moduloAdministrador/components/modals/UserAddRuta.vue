<template>
  <div>
    <div class="iop-light-modal">
      <v-layout row wrap>
        <v-flex xs12 md4>
          <div class="iop-spinner-container" v-if="sSpinner">
            <v-progress-circular
              :size="50"
              color="blue-grey darken-3"
              indeterminate
            ></v-progress-circular>
          </div>
          <div class="modal-servicio" v-else>
            <div class="modal-center">
              <div class="modal-avatar">
                <img :src="`https://api.adorable.io/avatar/80/${currentServicio.codigo}`">
              </div>
              <div class="modal-servicio-information">
                <h2>{{currentServicio.nombre}}</h2>
                <p>{{currentServicio.descripcion}}</p>
                <div class="modal-servicio-gral">
                  <v-layout row wrap>
                    <v-flex xs5 style="font-weight: 500">Entidad</v-flex>
                    <v-flex xs7 style="text-align:left">
                      {{currentServicio.datosEntidad.descripcionEntidad}}
                      {{currentServicio.datosEntidad.siglaEntidad}}
                    </v-flex>
                    <v-flex xs5 style="font-weight: 500">Código</v-flex>
                    <v-flex xs7 style="text-align:left">
                      {{currentServicio.codigo}}
                    </v-flex>
                    <v-flex xs5 style="font-weight: 500">Estado</v-flex>
                    <v-flex xs7 style="text-align:left">
                      {{currentServicio.estado}}
                    </v-flex>
                  </v-layout>
                </div>
              </div>
            </div>
          </div>
        </v-flex>
        <v-flex xs12 md8>
          <div class="iop-spinner-container" v-if="rSpinner">
            <v-progress-circular
              :size="50"
              color="blue-grey darken-3"
              indeterminate
            ></v-progress-circular>
          </div>
          <div v-else>
              <div class="modal-select">
                <div class="modal-select-area">
                  <ambientes-selector v-on:onSelect="selectAmbiente" :idAmbientes="arrayIdAmbientes"></ambientes-selector>
                </div>
              </div>
              <div class="modal-rutes-container modal-routes-selector" style="min-height:300px">
                <routes-selector  v-if="idSelectedAmbiente" v-on:onSelect="selectRutas" :rutasServicio="rutasDelServicio" :idAmbiente="idSelectedAmbiente" :rutasUsuario="rutasDelUsuario"></routes-selector>
              </div>
              <div class="modal-action">
                <v-btn round light outline @click.stop="guardar" :loading="loading" :disabled="!idSelectedAmbiente">
                  Guardar
                </v-btn>
              </div>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EventBus from "@/utils/eventBus";
import serviciosApi from "@/services/serviciosService";
import usuariosApi from "@/services/usuariosService";
import RoutesSelector from "@/moduloAdministrador/components/shared/normalUserComponents/RutesSelector";
import AmbientesSelector from "@/moduloAdministrador/components/shared/normalUserComponents/AmbientesSelector";
import check from "@/utils/checkChanges";
export default {
  name: "modal-add-rutas-user",
  data() {
    return {
      currentServicio: {},
      rutasDelServicio: [],
      rutasDelUsuario: [],
      arrayIdAmbientes: [],
      sSpinner: true,
      rSpinner: true,
      idSelectedAmbiente: null,
      arrayRutasSelected: [],
      loading: false
    };
  },
  props: {
    idServicio: String
  },
  methods: {
    guardar() {
      this.loading = true;
      if (this.user.id === undefined || this.user.id === null) {
        this.$store.dispatch("notification", {
          message: "Error con la identidad del usuario",
          dangerous: true,
          time: 3000
        });
        this.loading = false;
      } else {
        let oldArray = this.formatArrayWOactives(this.rutasDelUsuario);
        let newArray = this.formatArrayActives(this.arrayRutasSelected);
        usuariosApi
          .patchUsuario(this.user.id, {
            rutas: check.checkArray(oldArray, newArray)
          })
          .then(data => {
            this.loading = false;
            EventBus.$emit("close-lg-modal");
          });
      }
    },
    formatArrayActives(Arry = []) {
      let arrayResult = Arry.map(data => {
        let newArray = {
          idRuta: data.idRuta,
          idAmbiente: this.idSelectedAmbiente,
          idNormaTecnica: null,
          active: data.active
        };
        return newArray;
      });
      return arrayResult;
    },
    formatArrayWOactives(Arry = []) {
      let arrayResult = Arry.map(data => {
        let newArray = {
          idRuta: data.idRuta,
          idAmbiente: this.idSelectedAmbiente,
          idNormaTecnica: null
        };
        return newArray;
      });

      return arrayResult;
    },
    selectAmbiente(ambiente) {
      this.idSelectedAmbiente = ambiente;
      this.arrayRutasSelected = [];
    },
    selectRutas(rutas) {
      this.arrayRutasSelected = rutas;
    }
  },
  mounted() {
    serviciosApi.getServicio(this.idServicio).then(servicio => {
      this.arrayIdAmbientes = servicio.ambientes.map(
        ambiente => ambiente.idAmbiente
      );
      this.currentServicio = servicio;
      this.sSpinner = false;
    });
    serviciosApi.getRutas(this.idServicio).then(data => {
      this.rutasDelServicio = data.rutas;
      this.rSpinner = false;
    });
    usuariosApi.getUsuario(this.user.id).then(user => {
      this.rutasDelUsuario = user.rutas;
    });
  },
  components: {
    RoutesSelector,
    AmbientesSelector
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style>
.modal-select {
  padding-top: 20px;
  box-sizing: border-box;
  width: 100%;
}
.modal-select-area {
  max-width: 90%;
  margin: 0 auto;
}
.modal-select-area .modal-selection-title {
  color: var(--inter-primary);
  font-size: 1rem;
}
.modal-select-area .modal-selection-subtitle {
  color: var(--inter-secondary);
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 0.8rem;
}
.theme--dark .modal-select-area .v-label {
  color: var(--inter-primary) !important;
}
.iop-light-modal {
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
  border-radius: 3px;
}

.modal-servicio {
  width: 100%;
  height: 100%;
  min-height: 200px;
  background-color: var(--inter-primary);
  padding: 20px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-avatar {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  border: solid 1px var(--inter-secondary);
  margin: 0 auto;
}
.modal-servicio-information {
  padding: 16px 0;
  text-align: center;
}
.modal-servicio-gral {
  width: 100%;
  font-weight: 300;
}
.modal-servicio-information > h2 {
  font-size: 1.2rem;
}
.modal-servicio-information > p {
  line-height: 1rem;
  font-weight: 400;
}
.modal-rutes-container {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
.modal-action {
  padding: 10px 20px;
  text-align: right;
}
.modal-routes-selector {
  background-color: white;
}
.theme--dark .modal-routes-selector .v-icon {
  color: var(--inter-secondary) !important;
}
</style>
