<template>
  <div>
    <div class="inter-card-container inter-container">
      <information-bar
      style="margin-bottom:30px"
      :information="information"
      :aditionals="aditionals"
      />
      <usuarios-data-table/>
    </div>
  </div>
</template>

<script>
import InformationBar from "@/moduloAdministrador/components/shared/InformationBar";
import UsuariosDataTable from "@/moduloAdministrador/components/usuarios/UsuariosDataTable";
export default {
  name: "lista-usuarios",
  data() {
    return {
      information: {
        title: "Usuarios",
        description:
          "El objeto Consumer representa un consumidor, o un usuario, de una API. Puede confiar en Kong como el almacén de datos primario, o puede mapear la lista de consumidores con su base de datos para mantener la coherencia entre Kong y su almacén de datos principal existente."
      },
      aditionals: {
        vista: "Administrador"
      }
    };
  },
  components: {
    "usuarios-data-table": UsuariosDataTable,
    InformationBar
  }
};
</script>
