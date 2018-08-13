<template>
  <div class="steeper-container">
    <div class="options-header">
      <v-btn style="position:relative; top:-5px;" @click.stop.native="resetForm" flat small><v-icon left>refresh</v-icon></v-btn>
      <div class="atm-codigo">{{codigoHttp}}</div>
    </div>
    <v-form @submit.prevent="guardar" ref="formRespParametros" v-model="valid">
      <v-layout row wrap>
        <v-flex xs6 md5 class="iop-right-spacer">
         <v-text-field
            v-model="respModel.nombre"
            label="Nombre del parámetro"
            outline
            :rules="[rules.req, rules.noSpace]"
            :disabled="!hasId" 
          ></v-text-field>
        </v-flex>

        <v-flex xs6 md3 class="iop-left-spacer iop-right-spacer">
          <v-select
            v-model="respModel.tipo"
            :items="tipos"
            label="Tipo"
            outline
            @change="changeFormato"
            :rules="[rules.req]"
            :disabled="!hasId" 
          ></v-select>
        </v-flex>

        <v-flex xs6 md4 class="iop-left-spacer">
      <v-autocomplete
        outline
        v-model="respModel.idParametroRespuestaPadre"
        :items="items.filter(data => (data.tipo === 'object' || data.tipo === 'array'))"
        item-value="id"
        item-text="nombre"
        :disabled="items.filter(data => (data.tipo === 'object' || data.tipo === 'array')).length === 0"
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
        <v-flex xs6 md2 class="iop-right-spacer">
         <v-text-field
            v-model="respModel.formato"
            label="Formato"
            outline
            :rules="[rules.req]"
            :disabled="!hasId"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md7 class="iop-left-spacer iop-right-spacer">
         <v-text-field
            v-model="respModel.descripcion"
            label="Descripción"
            outline
            :rules="[rules.req]"
            :disabled="!hasId"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md3 class="iop-left-spacer">
         <v-text-field
            v-model="respModel.valorEjemplo"
            label="Ejemplo"
            outline
            :disabled="!hasId"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 style="text-align:right; padding-right:10px">
                <v-btn
                v-if="!selectedId"
                :disabled="!valid || !hasId"
                color="teal"
                dark
                fab
                @click.stop="agregar"
                :loading="loading"
                style="position:relative; top:-12px;"
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
                style="position:relative; top:-12px;"
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
        :isV2="true"
        />
      </div>
  </div>
</template>
<script>
import SteepersEditableList from "@/moduloAdministrador/components/rutas/SteepersEditableList";
import rules from "@/config/formRules";
import rutasApi from "@/services/rutasService";
import answersModule from "@/utils/responseManager";
import EventBus from "@/utils/eventBus";
import checkModule from "@/utils/checkChanges";
export default {
  data() {
    return {
      valid: true,
      loading: false,
      selectedId: null,
      respModel: {
        nombre: null,
        descripcion: null,
        tipo: null,
        formato: null,
        idParametroRespuestaPadre: null,
        valorEjemplo: null
      },
      oldModel: null,
      tipos: [
        "string",
        "boolean",
        "array",
        "object",
        "integer",
        "number",
        "date",
        "datetime"
      ],
      ubicaciones: ["query", "header", "path", "body", "cookie"],
      headers: ["nombre", "tipo", "formato", "Acciones"],
      items: []
    };
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
    async actualizar() {
      try {
        this.loading = true;
        this.respModel.idParametroRespuestaPadre =
          typeof this.respModel.idParametroRespuestaPadre === "undefined"
            ? null
            : this.respModel.idParametroRespuestaPadre;
        let fromForm = checkModule.checkIt(this.oldModel, this.respModel);
        let respuesta = await rutasApi.patchRespuesta(
          this.idRespuesta,
          this.selectedId,
          fromForm
        );
        if (answersModule.verifyPetition(respuesta).isOk) {
          this.resetForm();
          this.loadRespuestas();
        }
        this.loading = false;
      } catch (err) {
        console.error(err);
      }
    },
    async agregar() {
      try {
        this.loading = true;
        this.respModel.idParametroRespuestaPadre =
          typeof this.respModel.idParametroRespuestaPadre === "undefined"
            ? null
            : this.respModel.idParametroRespuestaPadre;
        let fromForm = Object.assign({}, this.respModel);

        let respuesta = await rutasApi.postRespuesta(
          this.idRespuesta,
          Object.assign(fromForm, { idRespuesta: this.idRespuesta })
        );
        if (answersModule.verifyPetition(respuesta).isOk) {
          let nuevoParametro = answersModule.verifyPetition(respuesta).answer;
          this.items.push(nuevoParametro);
          this.resetForm();
        }
        this.loading = false;
      } catch (err) {
        console.error(err);
      }
    },
    changeFormato() {
      if (this.respModel.tipo) {
        this.respModel.formato = this.formato(this.respModel.tipo);
      }
    },
    resetForm() {
      this.$refs.formRespParametros.reset();
      //fix AMD: hacer la mejor manera de quitar los parametros adiconales al hacer reset
      //temp
      if (this.respModel.id) delete this.respModel.id;
      if (this.respModel.fechaModificacion)
        delete this.respModel.fechaModificacion;
      if (this.respModel.fechaRegistro) delete this.respModel.fechaRegistro;
      //end temp
      if (this.respModel.requerido) this.respModel.requerido = false;
      this.respModel.valorEjemplo = null;
      this.selectedId = null;
    },
    loadRespuesta(data) {
      this.selectedId = data.id;
      this.respModel = Object.assign({}, data);
      this.oldModel = Object.assign({}, data);
    },
    async loadRespuestas() {
      let respuesta = await rutasApi.getRespuestas(this.idRespuesta);
      if (answersModule.verifyPetition(respuesta).isOk)
        this.items = answersModule.verifyPetition(
          respuesta
        ).answer.parametroRespuesta;
    },
    async deleteRespuestaDB(id) {
      let respuesta = await rutasApi.deleteRespuesta(this.idRuta, id);
      if (answersModule.verifyPetition(respuesta).isOk) this.loadRespuestas();
    },
    async loadRespuestaDB(id) {
      let respuesta = await rutasApi.getRespuesta(this.idRuta, id);
      if (answersModule.verifyPetition(respuesta).isOk)
        this.loadRespuesta(answersModule.verifyPetition(respuesta).answer);
    },
    formato(tipo) {
      switch (tipo) {
        case "string":
          return "UFT-8";
        case "boolean":
          return "true/false";
        case "array":
          return "any";
        case "object":
          return "any";
        case "integer":
          return "int-32";
        case "number":
          return "int-32";
        case "date":
          return "DD/MM/YYYY";
        case "datetime":
          return "00:00";
        default:
          return "";
      }
    }
  },
  computed: {
    rules() {
      return rules;
    },
    hasId() {
      return this.idRespuesta ? true : false;
    }
  },
  components: {
    SteepersEditableList
  },
  mounted() {
    this.loadRespuestas();
    EventBus.$on("deleteParametro", id => {
      this.deleteRespuestaDB(id);
    });
    EventBus.$on("editParametro", id => {
      this.loadRespuestaDB(id);
    });
  },
  beforeDestroy() {
    EventBus.$off("deleteParametro");
    EventBus.$off("editParametro");
  }
};
</script>
<style scoped>
.list-container {
  width: 100%;
  height: 290px;
  overflow-y: auto;
  padding: 5px;
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.26);
  background-color: var(--ds-bg-4);
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
