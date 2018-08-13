<template>
  <div>
  <v-container fluid>
    <v-switch height="10px" color="teal" light append-icon="add" :label="`Switch 1: ${switch1.toString()}`" v-model="switch1"></v-switch>
    <v-switch height="10px" color="teal" :label="`Switch 2: ${switch2.toString()}`" v-model="switch2"></v-switch>
  </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      switch1: true,
      switch2: false
    };
  }
};
</script>