<template>
  <div>
    <v-dialog v-model="active" :max-width="width" persistent lazy>
      <div>
        <modalsHeader :icon="data.icon?data.icon:'cloud'" :title="title" :description="data.description?data.description:''" v-on:onClose="close"/>
        <v-card light>
          <component :is="currentComponent" :data="data" v-on:closeModal="close"></component>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import EventBus from "@/utils/eventBus";
import modalsHeader from "@/moduloAdministrador/components/modals/modalsHeader";
import AmbientesCreate from "@/moduloAdministrador/components/ambientes/AmbientesCreateComponent";
import ServiciosCreate from "@/moduloAdministrador/components/servicios/ServiciosCreateComponent";
import EntidadesCreate from "@/moduloAdministrador/components/entidades/EntidadesCreateComponent";
import UserAddRuta from "@/moduloAdministrador/components/modals/UserAddRuta";
import RutasSteepersController from "@/moduloAdministrador/components/rutas/RutasSteepersController";
import CreateUser from "@/moduloAdministrador/components/accountSettings/createUser";
import addAmbiente from "@/moduloAdministrador/components/accountSettings/addAmbiente";
export default {
  name: "large-modal",
  data() {
    return {
      width: null,
      active: false,
      data: {},
      title: null,
      currentComponent: null
    };
  },
  components: {
    modalsHeader,
    "select-ruta-user": UserAddRuta,
    "registrar-ambiente": AmbientesCreate,
    "registrar-servicio": ServiciosCreate,
    "registrar-entidad": EntidadesCreate,
    //new style
    "crear-ruta": RutasSteepersController,
    "registrar-usuario": CreateUser,
    "habilitar-ambiente": addAmbiente
  },
  methods: {
    close() {
      this.active = false;
      EventBus.$emit("refresh-from-modal");
      this.currentComponent = null;
    },
    open() {
      this.active = true;
    },
    set(data, title, width = 900) {
      this.data = data;
      this.title = title;
      this.width = width;
      this.currentComponent = title
        .split(" ")
        .join("-")
        .toLowerCase();
    }
  },
  mounted() {
    this.$nextTick(
      function() {
        EventBus.$on("set-modal-data", this.set);
        EventBus.$on("open-modal", this.open);
      }.bind(this)
    );
  },
  destroyed() {
    EventBus.$off("set-modal-data", this.set);
    EventBus.$off("open-modal", this.open);
  }
};
</script>
