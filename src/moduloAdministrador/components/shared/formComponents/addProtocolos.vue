<template>
  <div>
    <v-text-field
    :disabled="disabled"
    :rules="rules"
    :error="error"
    v-model="protocolo"
    append-icon="add"
    @click:append="addProtocolo"
       @keyup.enter="addProtocolo"
    ></v-text-field>
  </div>
</template>
<script>
export default {
  name: "add-protocolo",
  data() {
    return {
      protocolo: null
    };
  },
  methods: {
    addProtocolo() {
      this.$emit("protocolosArray", this.protocolo);
      this.protocolo = null;
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
    }
  }
};
</script>
