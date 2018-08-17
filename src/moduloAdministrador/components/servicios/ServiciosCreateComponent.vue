<template>
  <div class="iop-card">
<!--         <formInformation title="Creación de un servicio" description="Datos necesarios para crear un servicio.">
        </formInformation> -->
        <v-form ref="formCreateServicios" class="iop-form-container" v-model="valid">
          <v-layout row wrap>
            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Nombre del servicio
                  <small>(Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :rules="[rules.req]" :disabled="!editable" v-model="servicioModel.nombre"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Código del servicio
                  <small> (Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :rules="[rules.req, rules.noSpace]" :disabled="!editable" v-model="servicioModel.codigo"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Versión del servicio
                  <small> (Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :rules="[rules.req]" :disabled="!editable" v-model="servicioModel.version"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Fecha inicio de disponibilidad
                  <small> (Opcional)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-menu
                ref="menu1"
                :close-on-content-click="false"
                v-model="menu1"
                :nudge-right="40"
                :return-value.sync="servicioModel.fechaInicioDisponibilidad"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="servicioModel.fechaInicioDisponibilidad"
                  label="Inicio"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="servicioModel.fechaInicioDisponibilidad" @input="$refs.menu1.save(servicioModel.fechaInicioDisponibilidad)"></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Fecha final de disponibilidad
                  <small> (Opcional)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-menu
                ref="menu2"
                :close-on-content-click="false"
                v-model="menu2"
                :nudge-right="40"
                :return-value.sync="servicioModel.fechaFinDisponibilidad"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="servicioModel.fechaFinDisponibilidad"
                  label="Final"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="servicioModel.fechaFinDisponibilidad" @input="$refs.menu2.save(servicioModel.fechaFinDisponibilidad)"></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Descripción del servicio
                  <small> (Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="servicioModel.descripcion"></v-text-field>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Palabras clave
                  <small> (Requerido mínimo 1)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
                  <add-palabra v-if="servicioModel.palabrasClave" v-on:palabrasArray="addPalabra" :error="servicioModel.palabrasClave.length === 0"/>
                  <div class="iop-chips-form-container">
                    <v-chip v-for="(palabra, index) in servicioModel.palabrasClave" :key="index" close @input="eliminarPalabra(index)">
                      {{palabra}}</v-chip>
                  </div>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Entidad propietaria
                  <small> (Requerido)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <EntidadesComboBox :disabled="!editable" :rules="[rules.req]" v-on:entidadChange="cambioEntidad"/>
            </v-flex>

            <v-flex xs4>
              <v-subheader>
                <div class="inter-subheader">
                  Agregar ambientes
                  <small> (Opcional)</small>
                </div>
              </v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-btn  @click.stop="modal = true" flat>Agregar ambiente<v-icon right dark>add</v-icon></v-btn>
            </v-flex>

            <v-flex xs12 style="text-align: right; padding:20px 16px 0 0;">
              <v-btn :disabled="!valid" :loading="loading" @click="guardar" flat round outline>Guardar <v-icon right small>save</v-icon></v-btn>
            </v-flex>

          </v-layout>
        </v-form>
         <modal-component :dialog="modal"></modal-component>
  </div>
</template>

<script>
import rules from '@/config/formRules'

import EntidadesComboBox from '@/moduloAdministrador/components/shared/EntidadesComboBox'
import serviciosApi from '@/services/serviciosService'
import addPalabras from '@/moduloAdministrador/components/shared/formComponents/addPalabras'
import EventBus from '@/utils/eventBus'
import modalComponent from '@/moduloAdministrador/components/servicios/ServiciosCreateModalComponent'
import formInformation from '@/moduloAdministrador/components/shared/formComponents/formInformationBar'

export default {
  data () {
    return {
      valid: true,
      editable: true,
      loading: false,
      modal: false,
      servicioModel: {
        nombre: null,
        codigo: null,
        version: null,
        descripcion: null,
        fechaInicioDisponibilidad: null,
        fechaFinDisponibilidad: null,
        palabrasClave: [],
        ambientes: [],
        datosEntidad: {}
      },
      menu1: '',
      menu2: ''
    }
  },
  methods: {
    guardar () {
      this.editable = false
      this.loading = true
      serviciosApi.postServicio(this.servicioModel).then(resp => {
        if (resp !== undefined) {
          this.closeCreateModal()
          this.loading = false
          this.editable = true
        } else {
          this.loading = false
          this.editable = true
        }
      })
    },
    addPalabra (palabra) {
      this.servicioModel.palabrasClave.push(palabra)
    },
    eliminarPalabra (key) {
      this.servicioModel.palabrasClave.splice(key, 1)
    },
    saveAmbiente (ambiente) {
      // siguiente codigo,solo porque el emitter de vue emite 2 veces
      if (!Object.values(ambiente).some(val => typeof val === 'object')) {
        this.servicioModel.ambientes.push(ambiente)
      }
    },
    cambioEntidad (entidad) {
      this.servicioModel.datosEntidad = {
        id: entidad.idEntidad,
        numeroEntidad: entidad.numeroEntidad,
        descripcionEntidad: entidad.descripcionEntidad,
        siglaEntidad: entidad.siglaEntidad
      }
    },
    isAmbienteValid (obj = {}) {
      let flag = 0
      Object.values(obj).map(obj => {
        obj === null || obj === undefined ? flag++ : ''
        return obj
      })
      return !(flag > 0)
    }
  },
  computed: {
    rules () {
      return rules
    }
  },
  components: {
    'add-palabra': addPalabras,
    EntidadesComboBox,
    modalComponent,
    formInformation
  },
  mounted () {
    EventBus.$on('saveServiceModal', ambiente => {
      // arreglado chuscamente, el evento se emite dos vences...
      this.isAmbienteValid(ambiente)
        ? this.servicioModel.ambientes.push(ambiente)
        : ''
    })
    EventBus.$on('cancelServiceModal', () => {
      this.modal = false
    })
  },
  beforeDestroy () {
    EventBus.$off('saveServiceModal')
    EventBus.$off('cancelServiceModal')
  }
}
</script>
