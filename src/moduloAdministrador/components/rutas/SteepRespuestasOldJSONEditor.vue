<template>
  <div class="steeper-container">
    <v-form @submit.prevent="guardar" ref="formRespuestas" v-model="valid">
      <v-layout row wrap>
        <v-flex xs6 md5 class="iop-right-spacer">
         <v-text-field
            v-model="model.nombre"
            placeholder="Nombre de la definición"
            solo
            flat
            single-line
            autofocus
            :rules="[rules.req]"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md7 class="iop-left-spacer">
         <v-text-field
            v-model="model.descripcion"
            placeholder="Descripción"
            solo
            flat
            single-line
            :rules="[rules.req]"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md3 class="iop-right-spacer">
          <v-text-field
            v-model.number="model.codigoHttp"
            placeholder="Código HTTP"
            solo
            flat
            single-line
            :rules="[rules.req]"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md3 class="iop-left-spacer iop-right-spacer">
          <v-text-field
            v-model="model.tipoContenido"
            :items="tipos"
            placeholder="Tipo"
            solo
            flat
            single-line
            disabled
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md3 class="iop-right-spacer iop-left-spacer">
          <v-text-field
            solo
            single-line
            flat
            placeholder="Estructura"
            append-outer-icon="visibility"
          ></v-text-field>
        </v-flex>

        <v-flex xs6 md3 class="iop-left-spacer">
          <v-text-field
            solo
            single-line
            flat
            placeholder="Ejemplo"
            v-model="nonFormatedJson"
            @input="verifyJson"
            append-outer-icon="visibility"
            @click:append-outer.stop="openModal"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 style="text-align:right; padding-right:20px">

    <v-dialog
      v-model="dialog"
      width="600"
      hide-overlay
    >
    <modalsHeader icon="code" isNested v-on:onClose="dialog = false"/>
          <vue-json-editor v-model="validJson" :show-btns="false" @json-change="onJsonChange"></vue-json-editor>
    </v-dialog>

              <v-btn
                :disabled="!valid"
                color="teal"
                dark
                fab
                small
                @click.stop="agregar"
                style="position:relative; top:-15px;"
              >
                <v-icon style="transition:1s all;transform:rotate(-90deg)" :class="{'arrow-down':valid}">forward</v-icon>
              </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
      <div class="list-container">
        <SteepersEditableList isList
        :headers="headers"
        :items="items"
        />
      </div>
  </div>
</template>
<script>
import modalsHeader from '@/moduloAdministrador/components/modals/modalsHeader'
import vueJsonEditor from 'vue-json-editor'
import SteepersEditableList from '@/moduloAdministrador/components/rutas/SteepersEditableList'
import rules from '@/config/formRules'
import formatJson from '@/utils/formatJson'
export default {
  data () {
    return {
      dialog: false,
      valid: true,
      model: {
        nombre: null,
        descripcion: null,
        codigoHttp: null,
        tipoContenido: 'aplication/json',
        estructura: null,
        idServicio: null,
        ejemplo: null
      },
      validJson: null,
      nonFormatedJson: null,
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
      ubicaciones: ['query', 'header', 'path', 'cookie'],
      headers: ['nombre', 'ubicación', 'tipo', 'resquerido', 'Acciones'],
      items: []
    }
  },

  methods: {
    openModal () {
      this.dialog = !this.dialog
    },
    guardar () {
      console.log('guardar detalles')
    },
    agregar () {
      let nuevoObjecto = Object.assign({}, this.model)
      this.items.push(nuevoObjecto)
      this.resetForm()
    },
    resetForm () {
      this.$refs.formRespuestas.reset()
    },
    verifyJson () {
      if (formatJson.toJson(this.nonFormatedJson)) {
        this.validJson = formatJson.toJson(this.nonFormatedJson)
      }
    },
    onJsonChange (value) {
      this.model.ejemplo = Object.assign({}, value)
      this.validJson = Object.assign({}, value)
      console.log('value:', value)
    }
  },
  computed: {
    rules () {
      return rules
    }
  },
  components: {
    SteepersEditableList,
    vueJsonEditor,
    modalsHeader
  }
}
</script>
<style scoped>
.list-container {
  width: 100%;
  height: 285px;
  overflow-y: auto;
  padding: 5px;
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.26);
}
.arrow-down {
  transform: rotate(90deg) !important;
}
</style>
