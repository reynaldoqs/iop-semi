<template>
  <div class="steeper-container">
    <v-form @submit.prevent="guardar" ref="formDetalles" v-model="valid">
      <v-layout row wrap>
        <v-flex xs6 md7 class="iop-right-spacer">
         <v-text-field
            placeholder="Nombre de la ruta"
            solo
            flat
            single-line
            autofocus
            v-model="model.nombre"
            :rules="[rules.req, rules.max50]"
            :disabled="hasId"
          ></v-text-field>
        </v-flex>
          <v-flex xs6 md5 class="iop-left-spacer">
         <v-text-field
            placeholder="Prefijo de la operación"
            solo
            flat
            single-line
            v-model="model.prefijoOperacion"
            :rules="[rules.req, rules.max20]"
            :disabled="hasId"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md9 class="iop-right-spacer">
         <v-text-field
            placeholder="Base URL"
            solo
            flat
            single-line
            v-model="model.baseUrl"
            :rules="[rules.req]"
            :disabled="hasId"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md3 class="iop-left-spacer">
          <v-select
            :items="metodosOtp"
            placeholder="Método HTTP"
            solo
            flat
            single-line 
            v-model="model.metodo"
            :rules="[rules.req]"
            :disabled="hasId" 
          ></v-select>
        </v-flex>
         <v-text-field class="iop-right-spacer"
            placeholder="Seguridad"
            solo
            flat
            single-line
            v-model="model.seguridad"
            disabled
          ></v-text-field>
        <v-flex xs6 md4 class="iop-left-spacer iop-right-spacer">
         <v-text-field
            placeholder="Versión"
            solo
            flat
            single-line
            v-model="model.version"
            :rules="[rules.req, rules.max9]"
            :disabled="hasId"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md4 class="iop-left-spacer">
          <add-palabra
            placeholder="Palabras clave"
            solo
            flat
            v-on:palabrasArray="addPalabra"
            :disabled="hasId"/>
        </v-flex>
        <v-flex xs12 md12>
         <v-text-field
            placeholder="Descripción de la ruta"
            solo
            flat
            single-line
            v-model="model.descripcion"
            :rules="[rules.req, rules.max150]"
            :disabled="hasId"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-form>
      <div class="list-container">
        <SteepersEditableChips
        :items="model.palabrasClave"
        :editable="!hasId"
        />
      </div>
  </div>
</template>
<script>
import addPalabra from "@/moduloAdministrador/components/shared/formComponents/addPalabras";
import SteepersEditableChips from "@/moduloAdministrador/components/rutas/SteepersEditableChips";
import rules from "@/config/formRules";
import EventBus from "@/utils/eventBus";
export default {
  data() {
    return {
      editable: true,
      valid: true,
      model: {
        nombre: null,
        metodo: "GET",
        baseUrl: null,
        descripcion: null,
        version: null,
        prefijoOperacion: null,
        seguridad: "JWT",
        palabrasClave: []
      },
      metodosOtp: ["GET", "POST", "PATCH", "DELETE", /* "OPTIONS",  */ "PUT"]
    };
  },
  props: {
    idRuta: {
      type: String,
      default: null
    }
  },
  methods: {
    emitirDatos() {
      this.$emit("answerDetalles", this.model);
    },
    addPalabra(val) {
      this.model.palabrasClave.push(val);
    },
    resetForm() {
      this.$refs.formDetalles.reset();
    }
  },
  components: {
    addPalabra,
    SteepersEditableChips
  },
  computed: {
    rules() {
      return rules;
    },
    hasId() {
      return this.idRuta ? true : false;
    }
  },
  mounted() {
    EventBus.$on("askDetalles", () => {
      this.emitirDatos();
    });
  },
  beforeDestroy() {
    EventBus.$off("askDetalles");
  }
};
</script>
<style scoped>
.list-container {
  width: 100%;
  height: 185px;
  overflow-y: auto;
  padding: 5px;
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.26);
}
</style>
