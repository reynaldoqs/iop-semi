<template>
  <div>
    <v-autocomplete v-model="selectedAmbiente" :rules="rules" :items="ambientesArray" item-value="id" item-text="nombre" box outline light label="Ambiente">
      <template slot="item" slot-scope="data">
                                  <div>
                                    <div class="">
                                      {{data.item.nombre}}
                                    </div>
                                    <div class="">
                                        {{ data.item.url }}
                                    </div>
                                  </div>
</template>

<template slot="selection" slot-scope="data">
  <div style="padding:2px 0 6px 0">
    <div class="modal-selection-title">
      {{data.item.nombre}}
    </div>
    <div class="modal-selection-subtitle">
      {{ data.item.url}}
    </div>
  
  </div>
</template>
                        </v-autocomplete>
  </div>
</template>

<script>
import ambientesApi from "@/services/ambientesService";
export default {
  data() {
    return {
      selectedAmbiente: {},
      ambientesArray: []
    };
  },
  name: "selector-ambientes",
  props: {
    idAmbientes: Array,
    rules: Array
  },
  watch: {
    selectedAmbiente() {
      this.$emit("onSelect", this.selectedAmbiente);
    }
  },
  mounted() {
    ambientesApi.getAmbientes().then(data => {
      this.idAmbientes.length > 0
        ? (this.ambientesArray = data.ambientes.filter(ambiente => {
            return ambiente.id.includes(this.idAmbientes);
          }))
        : "";
    });
  }
};
</script>
