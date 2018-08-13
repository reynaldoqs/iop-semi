<template>
  <div >
    
    <div class="inter-card-container inter-container">
      <information-bar style="margin-bottom:30px"
      :information="information"
      :aditionals="aditionals"
      />
      <search-bar isSearch isPaginationControl v-on:onSearch="search" v-on:changeSize="changeResults">
        <v-btn color="teal" @click.stop="modalAddAmbiente"><v-icon left>add</v-icon> Agregar un ambiente</v-btn>
      </search-bar>
      <div class="iop-spinner-container" v-if="spinner">
        <v-progress-circular :size="50" color="blue-grey darken-3" indeterminate></v-progress-circular>
      </div>
      <div class="my-auto-x-scroll" v-else>
        <ambientes-data-table :ambientes="ambientes"></ambientes-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import InformationBar from "@/moduloAdministrador/components/shared/InformationBar";
import ActionAndSearchBar from "@/moduloAdministrador/components/shared/ActionAndSearchBar";
import AmbientesDataTable from "@/moduloAdministrador/components/ambientes/AmbientesDataTable";
import ambientesApi from "@/services/ambientesService";
import EventBus from "@/utils/eventBus";

export default {
  data() {
    return {
      spinner: true,
      ambientes: [],
      information: {
        title: "Ambientes",
        description: "Crea conexionesa los nodos y activa el que quieras usar."
      },
      aditionals: {
        registrados: 0
      }
    };
  },
  methods: {
    modalAddAmbiente() {
      EventBus.$emit("open-modal");
      EventBus.$emit(
        "set-modal-data",
        {
          icon: "cast"
        },
        "Registrar ambiente",
        600
      );
    },
    search(query) {
      this.spinner = true;
      ambientesApi.searchAmbiente(query).then(data => {
        this.ambientes = data.ambientes;
        this.spinner = false;
      });
    },
    changeResults(size) {
      this.spinner = true;
      ambientesApi.getAmbientes(size).then(data => {
        this.ambientes = data.ambientes;
        this.spinner = false;
      });
    },
    loadAmbientes() {
      this.spinner = true;
      ambientesApi.getAmbientes().then(data => {
        this.ambientes = data.ambientes.map(ambiente => {
          return Object.assign(ambiente, { loading: false });
        });
        this.spinner = false;
      });
    }
  },
  components: {
    "search-bar": ActionAndSearchBar,
    InformationBar,
    AmbientesDataTable
  },
  mounted() {
    this.loadAmbientes();
    EventBus.$on("refresh-from-modal", () => {
      this.loadAmbientes();
    });
  },
  beforeDestroy() {
    EventBus.$off("refresh-from-modal");
  }
};
</script>