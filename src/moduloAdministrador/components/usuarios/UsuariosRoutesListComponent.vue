<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="rutas"
      hide-actions
      class="elevation-1"
      :loading="loading"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nombre}}</td>
        <td class="text-xs-right">{{ props.item.baseUrl }}</td>
        <td class="text-xs-right">{{ props.item.prefijoOperacion }}</td>
        <td class="text-xs-right">{{ props.item.version }}</td>
        <td class="text-xs-right">{{ props.item.metodo }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            @click="deleteItem(props.item)"
            color="red"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        El usuario no tienes rutas asociadas
      </template>
    </v-data-table>
  </div>
</template>
<script>
import usuariosApi from "@/services/usuariosService";
export default {
  data: () => ({
    dialog: false,
    loading: false,
    headers: [
      {
        text: "Nombre",
        align: "left",
        sortable: false,
        value: "nombre"
      },
      { text: "URL base", value: "baseUrl" },
      { text: "Prefijo", value: "prefijoOperacion" },
      { text: "Versión", value: "version" },
      { text: "Método", value: "metodo" },
      { text: "Actions", value: "name", sortable: false }
    ],
    rutas: []
  }),
  mounted() {
    this.loading = true;
    if (this.$route.params.id) {
      usuariosApi.getRutas(this.$route.params.id).then(data => {
        this.rutas = data.rutas;
        this.loading = false;
      });
    } else {
      this.$store.dispatch("notification", {
        message: "Error con el usuario",
        dangerous: true
      });
    }
  },
  methods: {
    async deleteItem(item) {
      const index = this.rutas.indexOf(item);
      confirm("¿Esta seguro de eliminar la ruta?") &&
        this.rutas.splice(index, 1);
      this.loading = true;
      let rutasUsuario = await usuariosApi.getUsuario(this.$route.params.id);
      rutasUsuario.rutas.splice(index, 1);
      usuariosApi
        .patchUsuario(this.$route.params.id, { rutas: rutasUsuario.rutas })
        .then(() => {
          this.loading = false;
        });
    }
  }
};
</script>