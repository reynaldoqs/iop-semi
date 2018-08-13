<template>
<div>
      <v-autocomplete
        v-model="model"
        :items="states"
        item-value="id"
        item-text="siglaEntidad"
        :rules="rules"
        :loading="loading"
        :disabled="disabled"
      >
              <template
                slot="item"
                slot-scope="data"
              >
              <div>
                <div class="combo-box-title">
                  {{data.item.entidad}} - {{data.item.siglaEntidad}}
                </div>
                <div class="combo-box-subtitle">
                    {{ data.item.desEntidad }}
                </div>
              </div>

              </template>

              <template
                slot="selection"
                slot-scope="data"
              >
              <div>
                <div class="combo-box-title">
                  {{data.item.entidad}} - {{data.item.siglaEntidad}}
                </div>
                <div class="combo-box-subtitle">
                    {{ data.item.desEntidad }}
                </div>
              </div>
              </template>
      </v-autocomplete>
</div>
</template>
<script>
import entidadesApi from "@/services/entidadesService";
export default {
  name: "entidades-combo-box",
  data: () => ({
    isEditing: false,
    states: [],
    model: "",
    loading: false
  }),
  props: {
    rules: {
      type: Array
    },
    idEntidad: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  watch: {
    model() {
      let entidadFormateado = this.getInformation(this.model);
      if (entidadFormateado !== undefined) {
        this.$emit("entidadChange", {
          idEntidad: entidadFormateado.id,
          numeroEntidad: entidadFormateado.entidad,
          descripcionEntidad: entidadFormateado.desEntidad,
          siglaEntidad: entidadFormateado.siglaEntidad
        });
      }
    }
  },
  mounted() {
    this.loading = true;
    entidadesApi.getEntidades(1000).then(data => {
      this.states = data.entidades;
      this.model = this.idEntidad;
      this.loading = false;
    });
  },
  methods: {
    getInformation(id) {
      return this.states.find(value => {
        return value.id === id;
      });
    }
  }
};
</script>
<style scoped>
.combo-box-title {
  color: white;
}
.combo-box-subtitle {
  font-weight: 300;
}
</style>
