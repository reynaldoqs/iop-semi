<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" lazy persistent max-width="600px">
      <v-card>
        <v-form ref="formModal" class="iop-form-container" @submit.prevent="save" v-model="validModal">

        <v-card-text>
          <v-layout row wrap>
            <v-flex xs4>
              <v-subheader>Selección de ambiente</v-subheader>
            </v-flex>

            <v-flex xs8>

      <v-autocomplete
        v-model="ambienteModel.idAmbiente"
        :items="ambientes"
        item-value="id"
        item-text="nombre"
        :rules="[rules.req]"
      >
              <template
                slot="item"
                slot-scope="data"
              >
              <div>
                <div class="combo-box-title">
                  {{data.item.url}}
                </div>
                <div class="combo-box-subtitle">
                    {{ data.item.ipServidor }}
                </div>
              </div>

              </template>

              <template
                slot="selection"
                slot-scope="data"
              >
              <div>
                <div class="combo-box-title">
                  {{data.item.nombre}}
                </div>
                <div class="combo-box-subtitle">
                    {{ data.item.url }}
                </div>
              </div>
              </template>
      </v-autocomplete>

            </v-flex>

            <v-flex xs4>
              <v-subheader>Path del servicio</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :rules="[rules.req]" v-model="ambienteModel.pathServicio" label="URL"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-subheader>Protocolo</v-subheader>
            </v-flex>
            <v-flex xs8>
                      <v-select
                    :rules="[rules.req]"
                    :items="protocolos"
                    v-model="ambienteModel.protocolo"
                    label="protocolo"
                    single-line
                  ></v-select>
            </v-flex>
            <v-flex xs4>
              <v-subheader>IP del servidor</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field  :rules="[rules.req, rules.ip]" v-model="ambienteModel.ipServidor" label="IP"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-subheader>ACL<small class="instructions">(Action Control List)</small></v-subheader>
            </v-flex>
            <v-flex xs8>
               <v-checkbox v-model="ambienteModel.acl"></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-subheader>JWT<small class="instructions">(Json Web Token)</small></v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-checkbox v-model="ambienteModel.jwt"></v-checkbox>
            </v-flex>
            <v-flex xs4>
              <v-subheader>EXP<small class="instructions">(Expiration)</small></v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-checkbox v-model="ambienteModel.exp"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  flat @click.native="cancel">Cancelar</v-btn>
          <v-btn   type="submit" flat @click.native="save" :disabled="!validModal">Guardar</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import rules from '@/config/formRules'
import ambientesApi from '@/services/ambientesService'
import EventBus from '@/utils/eventBus'
export default {
  name: 'servicios-modal',
  data () {
    return {
      validModal: true,
      ambienteModel: {
        protocolo: 'http',
        acl: false,
        jwt: false,
        exp: false
      },
      ambientes: [],
      protocolos: ['https', 'http']
    }
  },
  props: {
    dialog: {
      type: Boolean
    }
  },
  methods: {
    save () {
      let newAmbiente = Object.assign({}, this.ambienteModel)
      EventBus.$emit('saveServiceModal', newAmbiente)
      this.ownReset()
      EventBus.$emit('cancelServiceModal')
    },
    cancel () {
      this.$refs.formModal.reset()
      this.ownReset()
      EventBus.$emit('cancelServiceModal')
    },
    ownReset () {
      this.$refs.formModal.reset()
      this.ambienteModel.acl = false
      this.ambienteModel.jwt = false
      this.ambienteModel.exp = false
    }
  },
  mounted () {
    ambientesApi.getAmbientes().then(data => {
      this.ambientes = data.ambientes
    })
  },
  computed: {
    rules () {
      return rules
    }
  }
}
</script>
<style scoped>
.instructions {
  font-weight: lighter;
  margin-left: 5px;
}
</style>
