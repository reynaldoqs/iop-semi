<template>
  <div class="steeper-container">
    <div class="options-header">
      <v-btn style="position:relative; top:-5px;" @click="goBack" flat small><v-icon left>keyboard_backspace</v-icon>Volver</v-btn>
      <div class="atm-codigo">{{codigoHttp}}</div>
    </div>
    <v-form @submit.prevent="guardar" ref="formRespParametros" v-model="valid">
      <v-layout row wrap>
        <v-flex xs6 md5 class="iop-right-spacer">
         <v-text-field
            v-model="model.nombre"
            placeholder="Nombre del parámetro"
            solo
            flat
            single-line
            autofocus
            :rules="[rules.req, rules.noSpace]"
            :disabled="!hasId"
          ></v-text-field>
        </v-flex>

        <v-flex xs6 md3 class="iop-left-spacer iop-right-spacer">
          <v-select
            v-model="model.tipo"
            :items="tipos"
            placeholder="Tipo"
            solo
            flat
            single-line
            @change="changeFormato"
            :rules="[rules.req]"
            :disabled="!hasId"
          ></v-select>
        </v-flex>

        <v-flex xs6 md4 class="iop-left-spacer">
      <v-autocomplete
            solo
            flat
            single-line
        v-model="model.idParametroRespuestaPadre"
        :items="items.filter(data => (data.tipo === 'object' || data.tipo === 'array'))"
        item-value="id"
        item-text="nombre"
        :disabled="items.filter(data => (data.tipo === 'object' || data.tipo === 'array')).length === 0"
        placeholder="Parámetro padre"
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
        <v-flex xs6 md2 class="iop-right-spacer">
         <v-text-field
            v-model="model.formato"
            placeholder="Formato"
            solo
            flat
            single-line
            :rules="[rules.req]"
            :disabled="!hasId"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md7 class="iop-left-spacer iop-right-spacer">
         <v-text-field
            v-model="model.descripcion"
            placeholder="Descripción"
            solo
            flat
            single-line
            :rules="[rules.req]"
            :disabled="!hasId"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md3 class="iop-left-spacer">
         <v-text-field
            v-model="model.valorEjemplo"
            placeholder="Ejemplo"
            solo
            flat
            single-line
            :disabled="!hasId"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 style="text-align:right; padding-right:20px">
              <v-btn
                :disabled="!valid || !hasId"
                color="teal"
                dark
                fab
                small
                @click.stop="agregar"
                style="position:relative; top:-12px;"
                :loading="loading"
              >
                <v-icon style="transition:1s all;transform:rotate(-90deg)" :class="{'arrow-down':valid}">forward</v-icon>
              </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
      <div class="list-container">
        <SteepersEditableList
        :headers="headers"
        :items="items"
        :isV2="true"
        />
      </div>
  </div>
</template>
<script>
import SteepersEditableList from '@/moduloAdministrador/components/rutas/SteepersEditableList'
import rules from '@/config/formRules'
import rutasApi from '@/services/rutasService'
import answersModule from '@/utils/responseManager'
export default {
  data () {
    return {
      valid: true,
      loading: false,
      model: {
        nombre: null,
        descripcion: null,
        tipo: null,
        formato: null,
        idParametroRespuestaPadre: null,
        valorEjemplo: null
      },
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
      ubicaciones: ['query', 'header', 'path', 'body', 'cookie'],
      headers: ['nombre', 'tipo', 'formato', 'Acciones'],
      items: []
    }
  },
  props: {
    idRespuesta: {
      type: String,
      default: null
    },
    codigoHttp: {
      type: Number,
      default: null
    }
  },
  methods: {
    guardar () {
      alert(this.model)
    },
    async agregar () {
      try {
        this.loading = true
        this.model.idParametroRespuestaPadre =
          typeof this.model.idParametroRespuestaPadre === 'undefined'
            ? null
            : this.model.idParametroRespuestaPadre
        let fromForm = Object.assign({}, this.model)

        let respuesta = await rutasApi.postRespuesta(
          this.idRespuesta,
          Object.assign(fromForm, { idRespuesta: this.idRespuesta })
        )
        if (answersModule.verifyPetition(respuesta).isOk) {
          let nuevoParametro = answersModule.verifyPetition(respuesta).answer
          this.items.push(nuevoParametro)
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
      this.$refs.formRespParametros.reset()
      if (this.model.requerido) this.model.requerido = false
      this.model.valorEjemplo = null
    },
    goBack () {
      this.$emit('onBack')
    },
    async loadRespuestas () {
      let respuesta = await rutasApi.getRespuestas(this.idRespuesta)
      if (answersModule.verifyPetition(respuesta).isOk) {
        this.items = answersModule.verifyPetition(
          respuesta
        ).answer.parametroRespuesta
      }
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
    }
  },
  computed: {
    rules () {
      return rules
    },
    hasId () {
      return !!this.idRespuesta
    }
  },
  components: {
    SteepersEditableList
  },
  mounted () {
    this.loadRespuestas()
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
}
.arrow-down {
  transform: rotate(90deg) !important;
}
.parametros-title {
  color: #66bb6a;
}
.parametros-subtitle {
  display: block;
  color: #ff7043;
  font-weight: 400;
  font-size: 11px;
}
.options-header {
  display: flex;
  justify-content: space-between;
}
.atm-codigo {
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
}
</style>
