<template>
  <div class="create-user-form">
    <formInformation title="Datos personales" description="Datos personales necesarios para validar el usuario.">
    </formInformation>
   <v-form ref="formUserPart1" class="iop-form-container" v-model="valid">
        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Nombres
                <small>(Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field :rules="[rules.req]" :disabled="!editable" v-model="userModel.nombres"></v-text-field>
          </v-flex>

          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Apellido paterno
                <small> (Opcional)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field :disabled="!editable" v-model="userModel.primerApellido"></v-text-field>
          </v-flex>

          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Apellido Materno
                <small> (Opcional)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field :disabled="!editable" v-model="userModel.segundoApellido"></v-text-field>
          </v-flex>

          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Carnet de Identidad
                <small> (Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
              <v-text-field :disabled="!editable" :rules="[rules.req, rules.integer]" v-model.number="userModel.numeroCarnetIdentidad"></v-text-field>
          </v-flex>

          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Complemento visible
                <small> (Opcional)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field :disabled="!editable" v-model="userModel.complementoCarnetIdentidad"></v-text-field>
          </v-flex>

        </v-layout>
    </v-form>
  </div>
</template>
<script>
import EventBus from '@/utils/eventBus'
import rules from '@/config/formRules'
import formInformation from '@/moduloAdministrador/components/shared/formComponents/formInformationBar'
export default {
  data () {
    return {
      editedModel: this.userModel,
      hasExtension: false,
      valid: true,
      showClave: false
    }
  },
  props: {
    userModel: {
      type: Object
    },
    editable: {
      type: Boolean
    }
  },
  watch: {
    valid () {
      EventBus.$emit('personalValid', this.valid)
    }
  },
  computed: {
    rules () {
      return rules
    }
  },
  components: {
    formInformation
  }
}
</script>
<style>
.extension {
  display: inline-flex;
}
.my-checkbox {
  margin-right: 25px;
}
</style>
