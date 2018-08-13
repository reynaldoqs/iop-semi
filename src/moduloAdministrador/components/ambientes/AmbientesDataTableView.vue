<template>
  <div>
    <table>
      <tr>
        <th v-for="(header, index) in headers" :key="index">
          <div class="header-item">
            {{header.title}}
          </div>
        </th>
      </tr>
      <tr v-for="(data, index) in items" :key="index">
        <td>
          <div class="cell-item-iop" @click="$router.push(`ambientes/detail/${data.id}`)">
            <div class="nombre-container">
              <div class="title-row text-over row-padding">
                <div class="row-link">{{data.nombre}}</div>
              </div>
              <div class="sub-title-row text-over">
                {{data.descripcion}}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div class="cell-item-iop">
            <div class="ubicacion-container">
              <div class="title-row">
                {{data.url}}
              </div>
              <div class="sub-title-row">
                {{data.ipServidor}}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div class="cell-item-iop">
            <div>
              <v-chip  color="green" flat v-for="(protocolo,index) in data.protocolos" :key="index" small>
                <v-icon v-if="protocolo === 'https'" left small>lock</v-icon>{{protocolo}}</v-chip>
            </div>
          </div>
        </td>
        <td>
          <div class="cell-item-iop">
            <div :estado="data.estado">
              {{data.estado}}
            </div>
          </div>
        </td>
        <td>
          <div class="cell-item-iop">
            <div @click="verificar(data.id, index)" style="margin-left:15px">
              <StatesButton :operation="operation(data.estado).action" :icon="operation(data.estado).icon" :color="operation(data.estado).color" :loading="data.loading"/>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import StatesButton from "@/moduloAdministrador/components/shared/StatesButton";
import ambientesApi from "@/services/ambientesService";

export default {
  name: "ambientes-datatable",
  data() {
    return {
      icon: "cached"
    };
  },
  props: {
    headers: {
      type: Array
    },
    items: {
      type: Array
    }
  },
  components: {
    StatesButton
  },
  methods: {
    verificar(ambienteId, index) {
      this.items[index].loading = true;
      setTimeout(() => {
        if (this.items[index].estado === "VERIFICADO") {
          ambientesApi
            .patchAmbiente(ambienteId, { estado: "HABILITADO" })
            .then(data => {
              if (data) {
                this.items[index].estado = "HABILITADO";
                //console.log("verificado");
              } else {
                //console.log("no verificado");
              }
            });
        } else {
          ambientesApi.verificarAmbiente(ambienteId).then(data => {
            if (data) {
              this.items[index].estado = "VERIFICADO";
              //console.log("verificado");
            } else {
              //console.log("no verificado");
            }
          });
        }

        this.items[index].loading = false;
      }, 500);
    },
    operation(estado) {
      switch (estado) {
        case "REGISTRADO":
          return { action: "Verificar", icon: "check", color: "#90A4AE" };
          break;

        case "VERIFICADO":
          return {
            action: "Habilitar",
            icon: "verified_user",
            color: "#90A4AE"
          };
          break;

        case "HABILITADO":
          return { action: "Inhabilitar", icon: "block", color: "#90A4AE" };
          break;

        case "INHABILITADO":
          return { action: "Habilitar", icon: "pan_tool", color: "#90A4AE" };
          break;

        default:
          return "No states";
          break;
      }
    }
  },
  computed: {}
};
</script>

<style scoped>
/*estilos solo para ambientes*/

.sub-title-row {
  color: var(--ds-txt-2);
  font-size: 0.9rem;
  line-height: 1rem;
}

.text-over {
  max-width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nombre-container {
  padding-left: 20px;
}
.row-link {
  color: var(--ds-txt-3);
}
.row-link:hover {
  text-decoration: underline;
}
/*stulos generales*/

table {
  border-spacing: 0;
  width: 100%;
}

tr:hover > td > .cell-item-iop {
  background-color: #243136;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.24);
}
tr {
  cursor: pointer;
}
.header-item {
  text-align: left;
  padding: 15px 5px 15px 15px;
}

.cell-item-iop {
  transition: 0.3s all;
  height: 55px;
  background-color: var(--ds-bg-2);
  box-shadow: 5px 3px 6px rgba(0, 0, 0, 0.16);
  margin-bottom: 10px;
  padding: 2px 5px 2px 10px;
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
}

td:first-child > div {
  border-radius: 3px 0 0 3px;
}

td:last-child > div {
  border-radius: 0 3px 3px 0;
}

td:first-child > div::before {
  content: "";
  width: 3px;
  height: 100%;
  background-color: var(--ds-bg-1);
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 3px 0 0 3px;
}

/*Estilos de los contenidos*/

.cell-user > div:first-child {
  line-height: 1.4rem;
}

.cell-user > div:last-child {
  color: var(--ds-txt-2);
  line-height: 0.9rem;
}
</style>
