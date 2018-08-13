<template>
  <div class="iop-card">
        <formInformation title="Creación de un ambiente" description="Datos necesarios para crear un ambiente.">
        </formInformation>
        <v-form class="iop-form-container" ref="formAmbientes" v-model="valid">
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
              <v-text-field :rules="[rules.req]" :disabled="!editable" v-model="ambientesModel.nombre"></v-text-field>
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
              <v-text-field :rules="[rules.req]" :disabled="!editable" v-model="ambientesModel.ipServidor"></v-text-field>
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
              <v-text-field :disabled="!editable" :rules="[rules.req]" v-model.number="ambientesModel.descripcion"></v-text-field>
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
              <add :disabled="!editable"  v-on:protocolosArray="addProtocolo"/>
                  <div class="iop-chips-form-container">
                    <v-chip v-for="(palabra, index) in ambientesModel.protocolos" :key="index" close @input="eliminarProtocolo(index)">
                      {{palabra}}</v-chip>
                  </div> 
            </v-flex>


            <v-flex xs12 style="text-align: right; padding:20px 16px 0 0;">
              <v-btn :disabled="!valid" :loading="loading" @click="guardar" flat round outline>Guardar<v-icon right small>save</v-icon></v-btn>
            </v-flex>

          </v-layout>
        </v-form>
  </div>
</template>

<script>
import rules from "@/config/formRules";
import ambientesApi from "@/services/ambientesService";
import addProtocolos from "@/moduloAdministrador/components/shared/formComponents/addProtocolos";
import formInformation from "@/moduloAdministrador/components/shared/formComponents/formInformationBar";
import EventBus from "@/utils/eventBus";
export default {
  name: "create-ambiente",
  data() {
    return {
      valid: true,
      editable: true,
      loading: false,
      ambientesModel: {
        protocolos: [],
        nombre: null,
        url: null,
        ipServidor: null,
        descripcion: null,
        token: "",
        urlAdministrativa: null
      }
    };
  },
  methods: {
    guardar() {
      this.editable = false;
      this.loading = true;
      ambientesApi.postAmbiente(this.ambientesModel).then(resp => {
        if (resp !== undefined) {
          this.closeCreateModal();
          this.loading = false;
          this.editable = true;
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
  }
};
</script>
