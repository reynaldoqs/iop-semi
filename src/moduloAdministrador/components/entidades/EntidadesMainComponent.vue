<template>
  <div >
    <div class="inter-card-container inter-container">
      <information-bar style="margin-bottom:30px"
      :information="information"
      :aditionals="aditionals"
      />
      <search-bar isSearch isPaginationControl v-on:onSearch="search" v-on:changeSize="changeResults">
        <v-btn color="teal" @click.stop="modalAddEntidad"><v-icon left>add</v-icon> Agregar una entidad</v-btn>
      </search-bar>
      <div class="iop-spinner-container" v-if="spinner">
        <v-progress-circular :size="50" color="blue-grey darken-3" indeterminate></v-progress-circular>
      </div>
      <div class="my-auto-x-scroll" v-else>
         <data-table-view tipo="entidades" :datos="requestData" v-on:onUpdatePagination="updatePagination"></data-table-view>
         <iopPaginator/> 
      </div>
    </div>
  </div>
</template>

<script>
import InformationBar from "@/moduloAdministrador/components/shared/InformationBar";
import ActionAndSearchBar from "@/moduloAdministrador/components/shared/ActionAndSearchBar";
import entidadesApi from "@/services/entidadesService";
import DataTableView from "@/moduloAdministrador/components/shared/DataTableView";
import iopPaginator from "@/moduloAdministrador/components/shared/iopPaginator";
import EventBus from "@/utils/eventBus";
export default {
  data() {
    return {
      spinner: true,
      requestData: {},
      information: {
        title: "Entidades",
        description:
          "El objeto Entidades representa a las entidades de la API. Puede adicionar una nueva entidad a la base de datos."
      },
      aditionals: {
        registrados: 0
      }
    };
  },
  methods: {
    modalAddEntidad() {
      EventBus.$emit("open-modal");
      EventBus.$emit(
        "set-modal-data",
        {
          icon: "account_balance"
        },
        "Registrar entidad",
        600
      );
    },
    updatePagination(pagination) {
      //console.log(`Tienes que hacer funcionar la paginación: ${pagination}`);
    },
    changeResults(value) {
      this.loadEntidades(value);
    },
    search(query) {
      this.spinner = true;
      entidadesApi.searchEntidad(query).then(data => {
        this.requestData = this.formatData(data);
        this.spinner = false;
      });
    },
    formatData(data) {
      //Formatea lo datos para enviarlos al data table(formato unico).
      let headers = [
        "Sigla Entidad",
        "Nro. Entidad",
        "Descripcion Entidad",
        "Estado",
        "Accion"
      ];
      return {
        totalItems: data.totalEntidades,
        items: data.entidades.map(data => {
          let formated = {
            data1: data.siglaEntidad,
            data2: data.entidad,
            data3: data.desEntidad,
            data4: data.estado,
            id: data.id
          };
          return formated;
        }),
        headers: headers.map(data => {
          let header = {
            text: data,
            align: "left",
            sortable: true
          };
          return header;
        })
      };
    },
    loadEntidades(limite = 10) {
      this.spinner = true;
      entidadesApi.getEntidades(limite).then(data => {
        this.aditionals.registrados = data.totalEntidades;
        this.requestData = this.formatData(data);
        this.spinner = false;
      });
    }
  },
  components: {
    "search-bar": ActionAndSearchBar,
    InformationBar,
    DataTableView,
    iopPaginator
  },
  mounted() {
    this.loadEntidades();
  }
};
</script>