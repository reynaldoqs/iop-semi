<template>
  <div>
    <v-text-field
      :disabled="disabled"
      :rules="rules"
      :error="error"
      :solo="solo"
      :flat="flat"
      :placeholder="placeholder"
      v-model="palabra"
      append-icon="add"
      @click:append="addPalabra"
       @keyup.enter="addPalabra"
    ></v-text-field>
  </div>
</template>
<script>
export default {
  name: "add-telefono",
  data() {
    return {
      palabra: null
    };
  },
  methods: {
    addPalabra() {
      this.$emit("palabrasArray", this.palabra);
      this.palabra = null;
    }
  },
  props: {
    disabled: {
      type: Boolean
    },
    rules: {
      type: Array
    },
    error: {
      type: Boolean
    },
    solo: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    }
  }
};
</script>
