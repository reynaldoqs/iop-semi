<template>
  <div>
    <v-text-field
    :disabled="disabled"
    :rules="rules"
    :error="error"
    v-model="numero"
    append-icon="add"
    @click:append="addNumber"
    @keyup.enter="addNumber"
    ></v-text-field>
  </div>
</template>
<script>
export default {
  name: 'add-telefono',
  data () {
    return {
      numero: null
    }
  },
  methods: {
    addNumber () {
      this.$emit('numbersArray', this.numero)
      this.numero = null
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
}
</script>
