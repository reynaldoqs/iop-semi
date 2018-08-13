<template>
<div>
      <v-autocomplete
        v-model="model"
        :items="states"
        item-value="id"
        item-text="nombre"
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
                  {{data.item.nombre}}
                </div>
                <div class="combo-box-subtitle">
                    {{ data.item.codigo }}
                </div>
              </div>

              </template>

              <template
                slot="selection"
                slot-scope="data"
              >
              <div>
                <div class="combo-box-title">
                  {{data.item.nombre}}
                </div>
                <div class="combo-box-subtitle">
                    {{ data.item.codigo}}
                </div>
              </div>
              </template>
      </v-autocomplete>
</div>
</template>
<script>
import serviciosApi from "@/services/serviciosService";
export default {
  data: () => ({
    states: [],
    model: "",
    loading: false
  }),
  props: {
    rules: {
      type: Array
    },
    idServicio: {
      type: String
    },
    disabled: Boolean
  },
  watch: {
    model() {
      this.$emit("updateIdServicio", this.model);
    }
  },
  mounted() {
    this.loading = true;
    serviciosApi.getServicios(500).then(data => {
      this.states = data.servicios;
      this.model = this.idServicio;
      this.loading = false;
    });
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
