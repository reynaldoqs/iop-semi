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
      <tr v-for="(data, index) in items" :key="index" >
        <td>
          <div class="cell-item-iop">
            <div class="entidad-container">
<!--                 <v-avatar>
                <img  :src="`https://api.adorable.io/avatar/40/${data.id}`">
                </v-avatar> -->
              <div style="padding-left:15px">
                <div class="title-row text-over row-padding">
                  <div class="row-link">{{data.nombre}}</div>
                </div>
                <div class="sub-title-row text-over">
                  {{data.descripcion}}
                </div>
              </div>
            </div>
          </div>
        </td>
        <td>
          <div class="cell-item-iop">
            <div class="nombre-container">
              <div class="title-row text-over row-padding">
                <div>{{data.metodo}}</div>
              </div>
              <div class="sub-title-row text-over">
                {{data.baseUrl}}
              </div>
            </div>
          </div>
        </td>
<!--         <td>
          <div class="cell-item-iop">
           <div>
             {{data.seguridad}}
           </div>
          </div>
        </td> -->
        <td>
          <div class="cell-item-iop">
            <div :estado="data.estado">
              {{data.estado}}
            </div>
          </div>
        </td>
        <td>
          <div class="cell-item-iop">
            <div class="respuestas-container">
                <span :http="respuesta.codigoHttp" class="respuesta-item" v-for="(respuesta, index) in data.respuestas" :key="index">{{respuesta.codigoHttp}}</span>
            </div>
          </div>
        </td>
        <td>
          <div class="cell-item-iop">
            <div class="options-container">
              <StatesButton @click.native="goCatalogo(data.numeroCatalogo) " icon="info" operation="Detalles de la ruta" color="gray" class="option-item"/>
              <StatesButton @click.native="openWindow(data.id)" icon="assignment" operation="Documentación de la ruta" color="gray" class="option-item"/>
              <StatesButton @click.native="checkActive(data.id)?removeRuta(data.id, index):addRuta(data.id, index)" :icon="checkActive(data.id)?'check':'add'" :operation="checkActive(data.id)?'Eliminar ruta':'Adicionar ruta'" :color="checkActive(data.id)?'#4CAF50':'#818181'" class="option-item"/>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import usuariosApi from "@/services/usuariosService";
import serviciosApi from "@/services/serviciosService";
import StatesButton from "@/moduloAdministrador/components/shared/StatesButton";
import EventBus from "@/utils/eventBus";
export default {
  name: "user-servicios-datatable",
  data() {
    return {
      userRoutes: [],
      selectedServicio: null
    };
  },
  props: {
    headers: Array,
    items: Array
  },
  methods: {
    addRuta(id, indice = -1) {
      //hacer un selector de ambientes *eventbus <=> eventbus
      let ambiente = this.selectedServicio.ambientes[0].idAmbiente;
      if (ambiente) {
        this.userRoutes.push({
          idRuta: id,
          idAmbiente: ambiente,
          idNormaTecnica: null
        });
        usuariosApi.patchUsuario(this.user.id, { rutas: this.userRoutes });
      }
    },
    removeRuta(id, indice = -1) {
      let index = this.userRoutes.map(ruta => ruta.idRuta).indexOf(id);
      this.userRoutes.splice(index, 1);
      usuariosApi
        .patchUsuario(this.user.id, { rutas: this.userRoutes })
    },
    goCatalogo(num) {
      this.$router.push({ path: `/dashboard/catalogo/${num}` });
    },
    openWindow(id) {
      window.open("https://www.materialui.co/colors");
    },
    checkActive(id) {
      return this.userRoutes.map(ruta => ruta.idRuta).includes(id);
    },
    loadRutasUsuario() {
      usuariosApi.getUsuario(this.user.id).then(data => {
        this.userRoutes = data.rutas;
      });
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
    this.loadRutasUsuario();
    serviciosApi.getServicio(this.$route.params.id).then(data => {
      if (data) {
        console.log(data);
        this.selectedServicio = data;
      }
    });
  },
  components: {
    StatesButton
  }
};
</script>

<style scoped>
.respuestas-container {
  text-align: center;
  margin-left: 10px;
}
.respuesta-item {
  font-weight: 700;
  font-size: 0.8rem;
}
.respuesta-item:not(:last-child)::after {
  content: ",";
  color: white;
  margin-right: 4px;
}
span[http*="2"] {
  color: #4db6ac;
}
span[http*="3"] {
  color: #ffd54f;
}
span[http*="4"] {
  color: #ff8a65;
}
span[http*="5"] {
  color: #ef9a9a;
}
/*estilos para la tabla servicios usr*/
.options-container {
  display: flex;
  justify-content: space-between;
}
.option-item:not(:first-child) {
  margin-left: 5px;
}
.entidad-container {
  display: inline-flex;
  padding-left: 10px;
  align-items: center;
}
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
  cursor: pointer;
}
.row-link:hover {
  color: var(--ds-txt-3);
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
.header-item {
  text-align: left;
  padding: 15px 5px 15px 15px;
}

.cell-item-iop {
  transition: 0.3s all;
  height: 60px;
  background-color: var(--ds-bg-2);
  box-shadow: 5px 3px 6px rgba(0, 0, 0, 0.16);
  margin-bottom: 10px;
  padding: 2px 4px 2px 8px;
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

.mail-container {
  color: var(--ds-txt-3);
}
.avatar-cont {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.cell-user > div:first-child {
  line-height: 1.4rem;
}

.cell-user > div:last-child {
  color: var(--ds-txt-2);
  line-height: 0.9rem;
}
</style>
