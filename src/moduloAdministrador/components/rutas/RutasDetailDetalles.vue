<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md10 class="iop-card">
        <formInformation title="Detalles" description="Muestra los detalles básicos de la ruta.">
          <v-btn flat icon :color="editable?'teal':'blue-grey'" @click="editable =! editable">
            <v-icon>edit</v-icon>
          </v-btn>
        </formInformation>
        <div class="iop-spinner-container" v-if="spinner">
          <v-progress-circular :size="50" color="blue-grey darken-3" indeterminate></v-progress-circular>
        </div>
        <v-form @submit.prevent="guardarUno" class="iop-form-container" ref="formUno" v-model="validUno" v-else>
          <div>
            <v-layout row wrap>

              <v-flex xs4>
                <v-subheader>
                  <div class="inter-subheader">
                    Nombre de la ruta
                    <small>(Requerido)</small>
                  </div>
                </v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field :disabled="!editable" :rules="[rules.req, rules.max50]" v-model="rutasModel.nombre" box></v-text-field>
              </v-flex>

              <v-flex xs4>
                <v-subheader>
                  <div class="inter-subheader">
                    Descripción de la ruta
                    <small>(Requerido)</small>
                  </div>
                </v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field :disabled="!editable" :rules="[rules.req, rules.max150]" v-model="rutasModel.descripcion" box></v-text-field>
              </v-flex>

              <v-flex xs4>
                <v-subheader>
                  <div class="inter-subheader">
                    Versión de la ruta
                    <small>(Requerido)</small>
                  </div>
                </v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field :disabled="!editable" :rules="[rules.req, rules.max9]" v-model="rutasModel.version" box></v-text-field>
              </v-flex>

              <v-flex xs4>
                <v-subheader>
                  <div class="inter-subheader">
                    Número de catálogo
                    <small>(Auto incremental)</small>
                  </div>
                </v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field disabled v-model="rutasModel.numeroCatalogo" box></v-text-field>
              </v-flex>

              <v-flex xs4>
                <v-subheader>
                  <div class="inter-subheader">
                    Base de la URL
                    <small>(Requerido)</small>
                  </div>
                </v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field :disabled="!editable" :rules="[rules.req, rules.noSpace]" v-model="rutasModel.baseUrl" box></v-text-field>
              </v-flex>

              <v-flex xs4>
                <v-subheader>
                  <div class="inter-subheader">
                    Prefijo de la operación
                    <small>(Requerido)</small>
                  </div>
                </v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field :disabled="!editable" :rules="[rules.req, rules.max20]" v-model="rutasModel.prefijoOperacion" box></v-text-field>
              </v-flex>

              <v-flex xs4>
                <v-subheader>
                  <div class="inter-subheader">
                    Métodos de la ruta
                    <small>(Requerido)</small>
                  </div>
                </v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-select disabled :rules="[rules.req]" :items="metodosOtp" v-model="rutasModel.metodo" box></v-select>
              </v-flex>

              <v-flex xs4>
                <v-subheader>
                  <div class="inter-subheader">
                    Servicio al que pertenecerá
                    <small>(Requerido)</small>
                  </div>
                </v-subheader>
              </v-flex>
              <v-flex xs8>
                <ServiciosComboBox :disabled="!editable" v-on:updateIdServicio="updateIdServicio" :idServicio="rutasModel.idServicio" :rules="[rules.req]" />
              </v-flex>
            </v-layout>
          </div>
          <div style="text-align: right; padding:20px 16px 0 0;">
            <v-btn v-show="editable" :loading="loading" @click="guardarUno" :disabled="!validUno || !editable" flat round outline>
              Guardar
              <v-icon right small>
                save
              </v-icon>
            </v-btn>
          </div>

        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ServiciosComboBox from '@/moduloAdministrador/components/shared/ServiciosComboBox'
import rutasApi from '@/services/rutasService'
import rules from '@/config/formRules'
import check from '@/utils/checkChanges'
import formInformation from '@/moduloAdministrador/components/shared/formComponents/formInformationBar'
export default {
  name: 'ruta-detail-one',
  data () {
    return {
      spinner: false,
      loading: false,
      editable: false,
      validUno: true,
      rutasModel: {
        nombre: null,
        version: null,
        numeroCatalogo: null,
        metodo: null,
        baseUrl: null,
        descripcion: null,
        prefijoOperacion: null,
        seguridad: null,
        estado: null,
        idServicio: null
      },
      rutasOldModel: {},
      metodosOtp: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT']
    }
  },
  methods: {
    guardarUno () {
      this.editable = false
      this.loading = true
      rutasApi
        .patchRuta(
          this.$route.params.id,
          check.checkIt(this.rutasOldModel, this.rutasModel)
        )
        .then(resp => {
          if (resp !== undefined) {
            this.ambientesModel = resp
            this.loading = false
            this.editable = false
          } else {
            this.loading = false
            this.editable = true
          }
        })
    },
    updateIdServicio (valor) {
      this.rutasModel.idServicio = valor
    }
  },
  computed: {
    rules () {
      return rules
    }
  },
  components: {
    ServiciosComboBox,
    formInformation
  },
  mounted () {
    this.spinner = true
    rutasApi.getRuta(this.$route.params.id).then(ruta => {
      this.rutasModel = ruta
      this.spinner = false
      this.rutasOldModel = JSON.parse(JSON.stringify(ruta))
      this.$emit('selectedComp', {
        titulo: ruta.nombre,
        subtitulo: ruta.descripcion
      })
    })
  }
}
</script>
