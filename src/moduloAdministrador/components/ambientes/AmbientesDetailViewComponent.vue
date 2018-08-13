<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md10 class="iop-card">
        <formInformation title="Detalles del ambiente" description="Muestra los detalles del ambiente seleccionado.">
          <v-btn flat icon :color="editable?'teal':'blue-grey'" @click="editable =! editable">
            <v-icon>edit</v-icon>
          </v-btn>
        </formInformation>
        <div class="iop-spinner-container" v-if="spinner">
          <v-progress-circular :size="50" color="blue-grey darken-3" indeterminate></v-progress-circular>
        </div>
        <v-form ref="formAmbientes" class="iop-form-container" v-model="valid" v-else>
          <v-layout row wrap>
  
            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Nombre del ambiente
                  <small>(Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :rules="[rules.req, rules.max50]" :disabled="!editable" v-model="ambientesModel.nombre"></v-text-field>
            </v-flex>
  
            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  URL del ambiente
                  <small> (Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :rules="[rules.req, rules.url]" :disabled="!editable" v-model="ambientesModel.url"></v-text-field>
            </v-flex>
  
            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Ip del servidor
                  <small> (Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :rules="[rules.req, rules.ip]" :disabled="!editable" v-model="ambientesModel.ipServidor"></v-text-field>
            </v-flex>
  
            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Descripción
                  <small> (Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :disabled="!editable" :rules="[rules.req, rules.max500]" v-model.number="ambientesModel.descripcion"></v-text-field>
            </v-flex>
  
            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Token
                  <small> (Opcional)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :disabled="!editable" v-model="ambientesModel.token"></v-text-field>
            </v-flex>
  
            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  URL Administrativa
                  <small> (Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :disabled="!editable" :rules="[rules.req, rules.url]" v-model="ambientesModel.urlAdministrativa"></v-text-field>
            </v-flex>
  
            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Protocolos del ambiente
                  <small> (Opcional)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <add :disabled="!editable" v-on:protocolosArray="addProtocolo" />
              <div class="iop-chips-form-container">
                <v-chip v-for="(palabra, index) in ambientesModel.protocolos" :key="index" close @input="editable?eliminarProtocolo(index):''">
                  {{palabra}}</v-chip>
              </div>
            </v-flex>
  
            <v-flex xs12 style="text-align: right; padding:20px 16px 0 0;">
              <v-btn v-show="editable" :disabled="!valid || !editable" :loading="loading" @click="guardar" flat round outline>Guardar <v-icon right small>save</v-icon></v-btn>
            </v-flex>
  
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import rules from "@/config/formRules";
import ambientesApi from "@/services/ambientesService";
import addProtocolos from "@/moduloAdministrador/components/shared/formComponents/addProtocolos";
import check from "@/utils/checkChanges";
import formInformation from "@/moduloAdministrador/components/shared/formComponents/formInformationBar";
export default {
  data() {
    return {
      spinner: false,
      valid: true,
      editable: false,
      loading: false,
      ambientesModel: {
        protocolos: null,
        nombre: null,
        url: null,
        ipServidor: null,
        descripcion: null,
        urlAdministrativa: null
      },
      ambientesOldModel: null
    };
  },
  methods: {
    guardar() {
      this.editable = false;
      this.loading = true;
      ambientesApi
        .patchAmbiente(
          this.$route.params.id,
          check.checkIt(this.ambientesOldModel, this.ambientesModel)
        )
        .then(resp => {
          if (resp !== undefined) {
            this.ambientesModel = resp;
            this.loading = false;
            this.editable = false;
          } else {
            this.loading = false;
            this.editable = true;
          }
        });
    },
    addProtocolo(protocolo) {
      this.ambientesModel.protocolos.push(protocolo);
    },
    eliminarProtocolo(key) {
      this.ambientesModel.protocolos.splice(key, 1);
    }
  },
  computed: {
    rules() {
      return rules;
    }
  },
  components: {
    add: addProtocolos,
    formInformation
  },
  mounted() {
    this.spinner = true;
    ambientesApi.getAmbiente(this.$route.params.id).then(data => {
      this.ambientesModel = data;
      this.ambientesOldModel = JSON.parse(JSON.stringify(data));
      this.spinner = false;
      this.$emit("selectedComp", {
        titulo: data.nombre,
        subtitulo: data.descripcion
      });
    });
  }
};
</script>
