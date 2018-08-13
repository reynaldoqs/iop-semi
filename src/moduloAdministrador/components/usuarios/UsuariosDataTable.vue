<template>
  <div>
    <search-bar isSearch isPaginationControl v-on:onSearch="search" v-on:changeSize="changeResults">
        <v-btn color="teal" activator @click.stop="modalCreateUser()"> <v-icon left>add</v-icon> Agregar un usuario</v-btn>
    </search-bar>
    <div class="iop-spinner-container" v-if="spinner">
      <v-progress-circular :size="50" color="blue-grey darken-3" indeterminate></v-progress-circular>
    </div>
    <inter-table :headers="usuarioHeaders" :items="usuarios" v-else/>
  </div>
</template>

<script>
import EventBus from "@/utils/eventBus";
import ActionAndSearchBar from "@/moduloAdministrador/components/shared/ActionAndSearchBar";
import UsuariosDataTableView from "@/moduloAdministrador/components/usuarios/UsuariosDataTableView";
import usuariosApi from "@/services/usuariosService";
import iopToolTip from "@/moduloAdministrador/components/shared/iopToolTip";
export default {
  data() {
    return {
      spinner: false,
      usuarios: [],
      usuarioHeaders: [
        {
          title: "Usuario",
          type: "user"
        },
        {
          title: "Correo Electrónico",
          type: "user"
        },
        {
          title: "Carnet de Identidad",
          type: "user"
        },
        {
          title: "Teléfonos",
          type: "user"
        },
        {
          title: "Estado",
          type: "user"
        },
        {
          title: "Acciones",
          type: "user"
        }
      ]
    };
  },
  components: {
    "inter-table": UsuariosDataTableView,
    "search-bar": ActionAndSearchBar,
    iopToolTip
  },
  methods: {
    modalCreateUser() {
      EventBus.$emit("open-modal");
      EventBus.$emit(
        "set-modal-data",
        {
          icon: "person_add",
          description: "Formulario para crear un nuevo usuario"
        },
        "Registrar usuario",
        600
      );
    },
    search(query) {
      this.spinner = true;
      usuariosApi.searchUsuario(query).then(data => {
        this.usuarios = data.usuarios;
        this.spinner = false;
      });
    },
    changeResults(size) {
      this.spinner = true;
      usuariosApi.getUsuarios(size).then(data => {
        this.usuarios = data.usuarios;
        this.spinner = false;
      });
    },
    loadUsuarios() {
      this.spinner = true;
      usuariosApi.getUsuarios().then(data => {
        this.usuarios = data.usuarios;
        this.spinner = false;
      });
    }
  },
  mounted() {
    this.loadUsuarios();
    EventBus.$on("refresh-from-modal", () => {
      this.loadUsuarios();
    });
  },
  beforeDestroy() {
    EventBus.$off("refresh-from-modal");
  }
};
</script>
