<template>
    <div>
        <particlesBG >
              <el-card class="iop-card" shadow="always">
                <el-tabs stretch class="iop-tabs" v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane name="ingreso" label="Ingresar">
                     <login-form/>
                  </el-tab-pane>
                  <el-tab-pane name="registro">
                      <span slot="label"><i class="el-icon-tickets" style="margin-right:13px;"></i>Registrarse</span>
                      Registro
                  </el-tab-pane>
                </el-tabs>
              </el-card>
        </particlesBG> 
    </div>
</template>
<script>
import particlesBG from "@/app/components/ParticlesBG";
import LoginForm from "@/app/components/LoginForm";
export default {
  data: () => ({
    activeName: "ingreso"
  }),
  components: {
    particlesBG,
    LoginForm
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style scoped>
.iop-card {
  background-color: transparent;
  border: none;
  width: 450px;
  max-width: 100%;
  /*   background: linear-gradient(
    45deg,
    rgba(49, 27, 146, 0.8),
    rgba(41, 7, 82, 0.8)
  ); */
  background-color: white;

  padding: 20px 16px;
}
.iop-tabs {
}
</style>
