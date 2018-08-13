<template>
  <div class="input-validator-container" id="input-usage">
    <v-text-field
          v-model="text"
          :messages="messages"
          type='text'
          :loading="loading"
          :error="error"
          :disabled="disabled"
          :rules="rules"
          :label="label"
          :box="box"
      ></v-text-field>
  </div>
</template>
<script>
import _ from "lodash";
import definicionesApi from "@/services/definicionesService";
export default {
  data() {
    return {
      servicio: "definiciones",
      messages: [],
      text: null,
      loading: false,
      error: false,
      icon: "cached"
    };
  },
  props: {
    disabled: Boolean,
    rules: Array,
    label: String,
    box: Boolean,
    value: String
  },
  methods: {
    apiRequest(value) {
      if (value === "" || value === null || value === undefined) {
        this.messages = [];
        this.messages.push("Campo requerido.");
        this.error = true;
        this.loading = false;
        return;
      }
      definicionesApi.searchDefinicion(value).then(data => {
        this.messages = [];
        if (data) {
          if (data.definiciones.length > 0) {
            this.messages.push("El nombre ya se encuentra registrado.");
            this.error = true;
          } else {
            this.messages.push("El nombre es válido");
          }
        } else {
          console.error("Error interno.");
        }
        this.loading = false;
      });
    },
    valid: _.debounce(function() {
      this.apiRequest(this.text);
    }, 800)
  },
  watch: {
    text() {
      this.error = false;
      this.loading = true;
      this.messages = [];
      this.messages.push("Verificando datos...");
      this.valid();
      this.$emit("input", this.text);
    },
    value() {
      this.text = this.value;
    }
  }
};
</script>
<style>
/* #input-usage .v-input__prepend-outer,
#input-usage .v-input__append-outer,
#input-usage .v-input__slot,
#input-usage .v-messages {
  border: 1px dashed rgba(0, 0, 0, 0.4);
} */
#input-usage .v-input__slot {
  border-bottom: 1px solid var(--ds-bg-2);
}
</style>
