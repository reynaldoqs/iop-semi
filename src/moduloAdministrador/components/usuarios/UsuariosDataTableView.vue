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
      <tr v-for="(user, index) in items" :key="index">
        <td>
          <div class="cell-item-iop" @click="$router.push(`usuarios/detail/${Object.values(user)[0]}`)">
            <div class="avatar-cont">
              <div class="cell-avatar">
                <div :rol="user.rol" :style="{border:`1px solid ${giveColor(user.datosEntidad.siglaEntidad)}`}">
                  {{user.usuario.charAt(0)}}
                </div>
              </div>
              <div class="cell-user">
                <div>{{user.usuario}}</div>
                <div>{{user.nombres}} {{user.primerApellido}} {{user.segundoApellido}}</div>
              </div>
            </div>
          </div>
        </td>
        <td>
          <div class="cell-item-iop">
            <div class="mail-container">{{user.correoElectronico}}</div>
          </div>
        </td>
        <td>
          <div class="cell-item-iop">
            <div class="ci-container">
              {{user.numeroCarnetIdentidad}} 
              <span>
                  {{user.complementoCarnetIdentidad}}
                </span>
            </div>
          </div>
        </td>
        <td>
          <div class="cell-item-iop">
            <div>
              <v-chip color="orange" small v-for="(tel,index) in user.telefonoCelular" :key="index">
                <v-icon left small>phone</v-icon>{{tel}}</v-chip>
            </div>
          </div>
        </td>
        <td>
          <div class="cell-item-iop">
            <div class="estado-container">{{user.estado}}</div>
          </div>
        </td>
        <td>
          <div class="cell-item-iop">
            <v-btn icon small @click.stop="adicionarAmbientes(user.id)">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </div>
        </td>
      </tr>
    </table>
    <div class="no-result" v-if="items.length === 0">
      No existen resultados
    </div>
  </div>
</template>

<script>
import EventBus from "@/utils/eventBus";
import colors from "@/utils/getColors";
export default {
  props: {
    headers: {
      type: Array
    },
    items: {
      type: Array
    }
  },
  methods: {
    giveColor(name) {
      return colors.getRgba(name, 1);
    },
    adicionarAmbientes(val) {
      EventBus.$emit("open-modal");
      EventBus.$emit(
        "set-modal-data",
        {
          icon: "view_comfy",
          description: "Habilite o deshabilite ambientes",
          userId: val
        },
        "Habilitar ambiente",
        400
      );
    }
  }
};
</script>

<style scoped>
.no-result {
  width: 100%;
  margin: 30px 0;
  text-align: center;
  color: #f44336;
  font-weight: 300;
  letter-spacing: 2px;
}
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

.mail-container {
  color: var(--ds-txt-3);
}
.estado-container {
  font-size: 0.9rem;
  color: white;
  font-weight: 700;
}
.ci-container {
  font-family: "Courier New", Courier, monospace;
}

.ci-container > span {
  color: #9ccc65;
}

.avatar-cont {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.cell-avatar > div {
  background-color: #516161;
  font-size: 20px;
  font-weight: bold;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  text-transform: uppercase;
}

div[rol="ADMINISTRADOR"]::after {
  content: "♛";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  color: goldenrod;
  position: absolute;
  top: 0;
  left: 50px;
}
div[rol="USUARIO"]::after {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: whitesmoke;
  position: absolute;
  top: 10px;
  left: 55px;
}

.cell-user > div:first-child {
  line-height: 1.4rem;
}

.cell-user > div:last-child {
  color: var(--ds-txt-2);
  line-height: 0.9rem;
}
</style>
