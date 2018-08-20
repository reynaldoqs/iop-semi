<template>
  <div>
  <div @click="isCollapse = !isCollapse" class="iop-aside-header">
  
  </div>
  <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="!isCollapse">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-upload"></i>
        <span slot="title" class="iop-aside-title">Servicios</span>
      </template>

      <el-menu-item-group>
        <span slot="title" class="iop-aside-title">Servicios de la plataforma</span>
        <el-submenu  v-for="(servicio, mainIndex) in servicios" :key="mainIndex" :index="`1-${mainIndex}`">
            <span class="max-letters" slot="title">{{servicio.nombre}}</span>
            <el-menu-item v-if="servicio.rutas.length > 0" v-for="(ruta,index) in servicio.rutas" :key="ruta.id" :index="`1-${mainIndex}-${index}`"><span class="max-letters" style="margin-right:0">{{ruta.nombre}}</span></el-menu-item>
        </el-submenu>
      </el-menu-item-group>
    </el-submenu>

    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">Navigator Two</span>
    </el-menu-item>

    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">Navigator Three</span>
    </el-menu-item>

    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">Navigator Four</span>
    </el-menu-item>
    
  </el-menu>
  </div>
</template>
<style>
.iop-aside-header {
  width: 100%;
  height: 65px;
  padding: 10px;
  text-align: right;
  background-color: gray;
  margin-bottom: 5px;
}
.el-menu-vertical-demo {
  max-height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 500px;
}
.iop-aside-title {
  font-weight: 700;
}
.max-letters {
  margin-right: 15px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: gray;
}
</style>

<script>
import usuariosApi from "@/services/usuariosService";
import serviciosApi from "@/services/serviciosService";
import rutasApi from "@/services/rutasService";

import { Loading } from "element-ui";
export default {
  data() {
    return {
      isCollapse: true,
      servicios: null
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    switchColapse() {
      this.isCollapse = !this.isCollapse;
    },
    async loadServicesDates() {
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: "Cargando servicios..."
      });
      let respuesta = await serviciosApi.getServicios();

      let promesasRutas = respuesta.servicios.map(servicio => {
        return serviciosApi.getRutas(servicio.id);
      });
      let arrayRespuestas = [];
      await Promise.all(promesasRutas).then(responses => {
        arrayRespuestas = responses.map(response => {
          let res = {
            rutas: response.rutas
          };
          return res;
        });
      });
      Object.keys(respuesta.servicios).map(key => {
        Object.assign(respuesta.servicios[key], arrayRespuestas[key]);
      });
      console.log(respuesta.servicios);
      this.servicios = respuesta.servicios;
      loadingInstance.close();
    }
  },
  mounted() {
    this.loadServicesDates();
  }
};
</script>