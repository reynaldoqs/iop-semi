<template>
  <div>
    <ambientes-table :headers="ambientesHeaders" :items="ambientes"/>
  </div>
</template>
<script>
import AmbientesDataTableView from "@/moduloAdministrador/components/ambientes/AmbientesDataTableView";
export default {
  data() {
    return {
      ambientesHeaders: [
        { title: "Nombre del Ambiente", type: "user" },
        { title: "Ubicación", type: "user" },
        { title: "Protocolos", type: "user" },
        { title: "Estado", type: "user" },
        { title: "Acciones", type: "user" }
      ]
    };
  },
  props: {
    ambientes: Array
  },
  components: {
    "ambientes-table": AmbientesDataTableView
  }
};
</script>
