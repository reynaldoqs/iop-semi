<template>
  <div class="bar-container">
    <v-layout row wrap>
      <v-flex xs12 md6 class="text-xs-center text-md-left">
        <div class="element-container" style="justify-content: flex-start;">
          <slot>

          </slot>
        </div>
      </v-flex>
      <v-flex xs12 md6 class="text-xs-center text-md-right">
        <div class="element-container">

        <div class="element" v-if="isSearch">
          <v-text-field
            label="Buscar"
            prepend-icon="search"
            clearable
            @input="onSearch"
            v-model="busqueda"
          ></v-text-field>
        </div>
        <div class="element" v-if="isPaginationControl">
          <v-select
          :items="items"
          label="Resultados"
          @change="changeSize"
          :value="items[1]"
        ></v-select>
        </div>

        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      busqueda: '',
      sizeResults: null,
      items: [5, 10, 15, 50, 100]
    }
  },
  methods: {
    onSearch () {
      this.$emit('onSearch', this.busqueda)
    },
    changeSize (value) {
      if (this.sizeResults !== value) {
        this.sizeResults = value
        this.$emit('changeSize', this.sizeResults)
      }
    }
  },
  props: {
    isSearch: {
      type: Boolean,
      required: false,
      default: false
    },
    isPaginationControl: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
.bar-container {
  margin: 5px 0;
  min-height: 80px;
}
.element-container {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.element:first-child {
  max-width: 350px;
  padding: 0 6px;
}
.element {
  max-width: 100px;
}
</style>
