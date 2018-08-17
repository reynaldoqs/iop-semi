<template>
<div id="cliente-app">
<el-container>
  <el-aside width="auto"><SideBar/></el-aside>
  <el-container>
    <el-header height="75px">
      <ToolBar/>
    </el-header>
    <el-main>Principal</el-main>
    <el-footer>Pie de página</el-footer>
  </el-container>
</el-container>
</div>

  <!--       
        <SideBar/>
        <h1>
            Cliente template
            <button @click.stop="notificar">Hacer notificacion</button>
        </h1> -->
</template>
<script>
import ToolBar from "@/app/components/ToolBar";
import SideBar from "@/moduloCliente/components/SideBar";
export default {
  components: {
    ToolBar,
    SideBar
  },
  methods: {
    notificar() {
      this.$notify({
        title: "Notificacion",
        message: "Error message",
        type: "error",
        offset: 60
      });
    }
  }
};
</script>
<style >
#cliente-app .el-container {
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #191919;
  text-align: center;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 50px;
}

.el-aside {
  background-color: #d3dce6;
  text-align: center;
  line-height: 200px;
  overflow-y: auto;
  text-align: left;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>

