<template>
  <div class="steeper-container iop-card" style="padding:20px 30px 40px 30px">
      <formInformation title="Parámetros" description="Muestra los parámetros registrados en la ruta.">
          <v-btn flat icon :color="!selectedId?'teal':'blue-grey'" @click="addSettings">
            <v-icon>add</v-icon>
          </v-btn>
      </formInformation>
    <v-form @submit.prevent="guardar" ref="formParametros" v-model="valid">
      <v-layout row wrap>
        <v-flex xs6 md2 class="iop-left-spacer">
          <div style="padding:0 2px;position:relative; top:-7px">
              <v-checkbox
              v-model="model.requerido"
              label="Requerido"
              color="teal"
              hide-details
              :disabled="!hasId || !editable"
              ></v-checkbox>
          </div>
        </v-flex>
        <v-flex xs6 md6 class="iop-right-spacer">
         <v-text-field
            v-model="model.nombre"
            label="Nombre del parámetro"
            outline
            :rules="[rules.req, rules.noSpace]"
            :disabled="!hasId || !editable"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md4 class="iop-left-spacer">
      <v-autocomplete
            outline
        v-model="model.idParametroPadre"
        :items="items.filter(data => data.ubicacion === 'body')"
        item-value="id"
        item-text="nombre"
        :disabled="items.filter(data => data.ubicacion === 'body').length === 0"
        label="Parámetro padre"
      >
              <template
                slot="item"
                slot-scope="data"
              >
            <div>
                <div class="parametros-title">
                  {{data.item.nombre}}
                </div>
                <div class="parametros-subtitle">
                    {{ data.item.ubicacion}} - ({{ data.item.tipo}})
                </div>
            </div>
              </template>
              <template
                slot="selection"
                slot-scope="data"
              >
                <div class="parametros-title">
                  {{data.item.nombre}}
                </div>
              </template>
      </v-autocomplete>
        </v-flex>
        <v-flex xs12>
         <v-text-field
            v-model="model.descripcion"
            label="Descripción"
            outline
            :rules="[rules.req]"
            :disabled="!hasId || !editable"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md2 class="iop-right-spacer">
          <v-select
            v-model="model.ubicacion"
            :items="ubicaciones"
            label="Ubicación"
            outline
            :rules="[rules.req]"
            :disabled="!editable || !hasId || typeof model.idParametroPadre === 'string'"
          ></v-select>
        </v-flex>
        <v-flex xs6 md2 class="iop-left-spacer iop-right-spacer">
          <v-select
            v-model="model.tipo"
            :items="tipos"
            label="Tipo"
            outline
            @change="changeFormato"
            :rules="[rules.req]"
            :disabled="!hasId || !editable"
          ></v-select>
        </v-flex>
        <v-flex xs6 md3 class="iop-left-spacer iop-right-spacer">
         <v-text-field
            v-model="model.formato"
            label="Formato"
            outline
            :rules="[rules.req]"
            :disabled="!hasId || !editable"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md3 class="iop-left-spacer">
         <v-text-field
            v-model="model.valorEjemplo"
            label="Valor ejemplo"
            outline
            :disabled="!hasId || !editable"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md2 style="text-align:right; padding-right:20px;">
              <v-btn
                v-if="!selectedId"
                :disabled="!valid || !hasId"
                color="teal"
                dark
                fab
                @click.stop="agregar"
                :loading="loading"
              >
                <v-icon style="transition:1s all;transform:rotate(-90deg)" :class="{'arrow-down':valid}">forward</v-icon>
              </v-btn>
              <v-btn
                v-else
                :disabled="!valid || !hasId"
                color="teal"
                dark
                fab
                @click.stop="actualizar"
                :loading="loading"
              >
                <v-icon style="transition:1s all;transform:rotate(-90deg)" :class="{'arrow-down':valid}">autorenew</v-icon>
              </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
      <div class="list-container">
        <SteepersEditableList
        :headers="headers"
        :items="items"
        />
      </div>
  </div>
</template>
<script>
import SteepersEditableList from '@/moduloAdministrador/components/rutas/SteepersEditableList'
import formInformation from '@/moduloAdministrador/components/shared/formComponents/formInformationBar'
import rules from '@/config/formRules'
import rutasApi from '@/services/rutasService'
import EventBus from '@/utils/eventBus'
import answersModule from '@/utils/responseManager'
import checkModule from '@/utils/checkChanges'
export default {
  data () {
    return {
      selectedId: null,
      editable: true,
      valid: true,
      loading: false,
      idRuta: null,
      model: {
        nombre: null,
        descripcion: null,
        requerido: false,
        ubicacion: null,
        tipo: null,
        formato: null,
        idParametroPadre: null,
        valorEjemplo: null
      },
      oldModel: null,
      tipos: [
        'string',
        'boolean',
        'array',
        'object',
        'integer',
        'number',
        'date',
        'datetime'
      ],
      ubicaciones: ['query', 'header', 'path', 'body'],
      headers: ['nombre', 'ubicación', 'tipo', 'formato', 'Acciones'],
      items: []
    }
  },
  watch: {
    'model.idParametroPadre' () {
      if (this.model.idParametroPadre) {
        this.model.ubicacion = 'body'
      }
    }
  },
  methods: {
    addSettings () {
      this.selectedId = null
      this.resetForm()
    },
    async actualizar () {
      try {
        this.loading = true
        this.model.idParametroPadre =
          typeof this.model.idParametroPadre === 'undefined'
            ? null
            : this.model.idParametroPadre
        let fromForm = checkModule.checkIt(this.oldModel, this.model)
        let respuesta = await rutasApi.patchParametro(
          this.idRuta,
          this.selectedId,
          fromForm
        )
        if (answersModule.verifyPetition(respuesta).isOk) {
          this.resetForm()
          this.loadParametros()
        }

        this.loading = false
      } catch (err) {
        console.error(err)
      }
    },
    async agregar () {
      try {
        this.loading = true
        this.model.idParametroPadre =
          typeof this.model.idParametroPadre === 'undefined'
            ? null
            : this.model.idParametroPadre
        let fromForm = Object.assign({}, this.model)

        // peticion al servicor
        let respuesta = await rutasApi.postParametro(
          this.idRuta,
          Object.assign(fromForm, { idRuta: this.idRuta })
        )
        // evaluacion a la respuesta
        if (answersModule.verifyPetition(respuesta).isOk) {
          let nuevoObjecto = answersModule.verifyPetition(respuesta).answer
          this.items.push(nuevoObjecto)
          this.resetForm()
        }

        this.loading = false
      } catch (err) {
        console.error(err)
      }
    },
    changeFormato () {
      if (this.model.tipo) {
        this.model.formato = this.formato(this.model.tipo)
      }
    },
    resetForm () {
      this.$refs.formParametros.reset()
      // fix: hacer la mejor manera de quitar los parametros adiconales al hacer reset
      // temp
      if (this.model.id) delete this.model.id
      if (this.model.fechaModificacion) delete this.model.fechaModificacion
      if (this.model.fechaRegistro) delete this.model.fechaRegistro
      // end temp
      if (this.model.requerido) this.model.requerido = false
      this.model.valorEjemplo = null
      this.selectedId = null
    },
    formato (tipo) {
      switch (tipo) {
        case 'string':
          return 'UFT-8'
        case 'boolean':
          return 'true/false'
        case 'array':
          return 'any'
        case 'object':
          return 'any'
        case 'integer':
          return 'int-32'
        case 'number':
          return 'int-32'
        case 'date':
          return 'DD/MM/YYYY'
        case 'datetime':
          return '00:00'
        default:
          return ''
      }
    },
    loadParametro (data) {
      this.selectedId = data.id
      this.model = Object.assign({}, data)
      this.oldModel = Object.assign({}, data)
    },
    async loadParametros () {
      let respuesta = await rutasApi.getParametros(this.idRuta)
      if (answersModule.verifyPetition(respuesta).isOk) { this.items = answersModule.verifyPetition(respuesta).answer.parametros }
    },
    async deleteParametroDB (id) {
      let respuesta = await rutasApi.deleteParametro(this.idRuta, id)
      if (answersModule.verifyPetition(respuesta).isOk) this.loadParametros()
    },
    async loadParametroDB (id) {
      let respuesta = await rutasApi.getParametro(this.idRuta, id)
      if (answersModule.verifyPetition(respuesta).isOk) { this.loadParametro(answersModule.verifyPetition(respuesta).answer) }
    }
  },
  computed: {
    rules () {
      return rules
    },
    hasId () {
      return !!this.idRuta
    }
  },
  components: {
    SteepersEditableList,
    formInformation
  },
  mounted () {
    this.idRuta = this.$route.params.id
    this.loadParametros()
    EventBus.$on('deleteParametro', id => {
      this.deleteParametroDB(id)
    })
    EventBus.$on('editParametro', id => {
      this.loadParametroDB(id)
    })
  },
  beforeDestroy () {
    EventBus.$off('deleteParametro')
    EventBus.$off('editParametro')
  }
}
</script>
<style scoped>
.list-container {
  width: 100%;
  height: 270px;
  overflow-y: auto;
  padding: 5px;
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.26);
  background-color: var(--ds-bg-4);
}
.arrow-down {
  transform: rotate(90deg) !important;
}
.parametros-title {
  color: #a5d6a7;
}
.parametros-subtitle {
  display: block;
  color: #ff8a65;
  font-weight: 400;
  font-size: 11px;
}
</style>
