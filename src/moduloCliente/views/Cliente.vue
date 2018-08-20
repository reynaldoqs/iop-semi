<template>
<div id="cliente-app">
<el-container>
  <el-aside width="auto"><side-bar/></el-aside>
  <el-container>
    <el-header height="auto">
      <tool-bar/>
    </el-header>
    <el-main>
      <section class="main-container">
       <pre>
         {{isAuthenticated}}
       </pre>
      </section>
      <notifications-bar/>
    </el-main>
    <el-footer>Pie de página</el-footer>
  </el-container>
</el-container>
</div>
</template>
<script>
import ToolBar from "@/app/components/ToolBar";
import SideBar from "@/moduloCliente/components/SideBar";
import NotificationsBar from "@/app/components/NotificationsBar";
import { mapGetters } from "vuex";

export default {
  components: {
    ToolBar,
    SideBar,
    NotificationsBar
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
  },
  computed: {
    ...mapGetters([
      "isAuthenticated"
      // ...
    ])
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
  width: 100%;
}

.el-aside {
  text-align: center;
  line-height: 200px;
  overflow-y: auto;
  text-align: left;
}

.el-main {
  background-color: #e9eef3;
  text-align: center;
  display: inline-flex;
  justify-content: flex-end;
}
</style>

