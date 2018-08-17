<template>
  <div class="iop-card">
        <formInformation title="Creación de una entidad" description="Datos necesarios para crear una entidad.">
        </formInformation>
        <v-form ref="formEntidad"  class="iop-form-container" v-model="valid">
          <v-layout row wrap>
            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Sigla de la entidad
                  <small>(Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :rules="[rules.req]" :disabled="!editable" v-model="entidadModel.siglaEntidad"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Descripción de la entidad
                  <small> (Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :rules="[rules.req, rules.max150]" :disabled="!editable" v-model="entidadModel.desEntidad"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Entidad tuición
                  <small> (Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :disabled="editable" v-model.number="entidadModel.entidadTuicion"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Imagen de la entidad
                  <small> (Opcional)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <picture-input
              crop
              ref="pictureInput"
              width="600"
              height="400"
              margin="20"
              accept="image/png"
              :size="1"
              button-class="btn"
              :custom-strings="{
                upload: '<h1>Imagen entidad</h1>',
                drag: 'Arrastrar un JPG o hacer un click'
              }"
              @change="onChange">
            </picture-input>
            </v-flex>

            <v-flex xs12 style="text-align: right; padding:20px 16px 0 0;">
              <v-btn :disabled="!valid" :loading="loading" @click="guardar" flat round outline>Guardar <v-icon right small>save</v-icon></v-btn>
            </v-flex>

          </v-layout>
        </v-form>
  </div>
</template>

<script>
import rules from '@/config/formRules'
import entidadesApi from '@/services/entidadesService'
import PictureInput from 'vue-picture-input'
import EventBus from '@/utils/eventBus'
import formInformation from '@/moduloAdministrador/components/shared/formComponents/formInformationBar'
export default {
  name: 'create-ambiente',
  data () {
    return {
      valid: true,
      editable: true,
      loading: false,
      entidadModel: {
        desEntidad: null,
        siglaEntidad: null,
        entidadTuicion: 0,
        urlImagen: null
      }
    }
  },
  methods: {
    guardar () {
      this.editable = false
      this.loading = true
      entidadesApi.postEntidad(this.entidadModel).then(resp => {
        if (resp !== undefined) {
          this.loading = false
          this.editable = true
        } else {
          this.loading = false
          this.editable = true
        }
      })
    },
    onChange (image) {
      if (image) {
        this.entidadModel.urlImagen = image
      } else {
        console.error('FileReader API not supported: use the <form>, Luke!')
      }
    }
  },
  computed: {
    rules () {
      return rules
    }
  },
  components: {
    PictureInput,
    formInformation
  }
}
</script>
