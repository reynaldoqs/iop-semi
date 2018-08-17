<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md9 class="iop-card">
        <formInformation
                title="Datos institucionales"
                description="Muestra los datos institucionales de un usuario registrado.">
            <v-btn flat icon :color="editable?'teal':'blue-grey'" @click="editable =! editable">
              <v-icon>edit</v-icon>
            </v-btn>
                </formInformation>
        <div class="iop-spinner-container" v-if="spinner">
          <v-progress-circular :size="50" color="blue-grey darken-3" indeterminate></v-progress-circular>
        </div>
        <v-form ref="formUsiarioInstitucional" class="iop-form-container" v-model="valid" v-else>
          <v-layout row wrap>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Correo electrónico
                  <small> (Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field v-model="userModel.correoElectronico" :disabled="!editable" :rules="[rules.req, rules.email]"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Número de Celular
                  <small> (Requerido mínimo 1)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <add-telefono v-if="userModel.telefonoCelular" :disabled="!editable" v-on:numbersArray="addTelefonos" :error="userModel.telefonoCelular.length === 0" />
              <div class="telefonos-container">
                <v-chip v-for="(numero, index) in userModel.telefonoCelular" :key="index" close @input="editable?eliminarTelefono(index):''">
                  <v-icon left>phone</v-icon>
                  {{numero}}</v-chip>
              </div>

            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Usuario
                  <small>(Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="userModel.usuario"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Contraseña
                  <small>(Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :append-icon="showClave ? 'visibility_off' : 'visibility'" :type="showClave ? 'text' : 'password'" :disabled="!editable" v-model="userModel.clave" @click:append="showClave=!showClave"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Datos de la entidad
                  <small>(Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <EntidadesComboBox :disabled="!editable" v-if="userModel.datosEntidad" :idEntidad="userModel.datosEntidad.idEntidad" v-on:entidadChange="cambioEntidad" />
            </v-flex>

            <v-flex xs12 style="text-align: right; padding:20px 16px 0 0;">
              <v-btn v-show="editable" :disabled="!valid" :loading="loading" @click="guardarUsuario" flat round outline>Guardar<v-icon right small>save</v-icon></v-btn>
            </v-flex>

          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import usuariosApi from '@/services/usuariosService'
import addNumbers from '@/moduloAdministrador/components/shared/formComponents/addNumbers'
import EntidadesComboBox from '@/moduloAdministrador/components/shared/EntidadesComboBox'
import rules from '@/config/formRules'
import check from '@/utils/checkChanges'
import formInformation from '@/moduloAdministrador/components/shared/formComponents/formInformationBar'
export default {
  name: 'Usuario-personal',
  data () {
    return {
      spinner: false,
      loading: false,
      editable: false,
      valid: true,
      hasExtension: true,
      showClave: false,
      userModel: {
        correoElectronico: null,
        telefonoCelular: [],
        usuario: null,
        datosEntidad: null
      },
      userOldModel: {}
    }
  },
  mounted () {
    this.spinner = true
    usuariosApi.getUsuario(this.$route.params.id).then(data => {
      this.spinner = false
      this.userModel = data
      this.userOldModel = JSON.parse(JSON.stringify(data))
    })
  },
  methods: {
    guardarUsuario () {
      this.editable = false
      this.loading = true
      usuariosApi
        .patchUsuario(
          this.$route.params.id,
          check.checkIt(this.userOldModel, this.userModel)
        )
        .then(resp => {
          if (resp !== undefined) {
            this.$router.go(-1)
          } else {
            this.loading = false
            this.editable = true
          }
        })
    },
    addTelefonos (telefono) {
      this.userModel.telefonoCelular.push(telefono)
    },
    eliminarTelefono (key) {
      this.userModel.telefonoCelular.splice(key, 1)
    },
    cambioEntidad (data) {
      this.userModel.datosEntidad = data
    }
  },
  computed: {
    rules () {
      return rules
    }
  },
  components: {
    'add-telefono': addNumbers,
    EntidadesComboBox,
    formInformation
  }
}
</script>
