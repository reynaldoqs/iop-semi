<template>
  <div>
    <div class="iop-inputs-container">
        <el-input
          class="iop-login-input"
          size="small"
          placeholder="Usuario"
          v-model="usuario"
          :disabled="!editable">
        </el-input>
            <el-input
          class="iop-login-input"
          size="small"
          placeholder="Contraseña"
          v-model="clave"
          :disabled="!editable">
        </el-input>
    </div>
   <el-button @click="onLogin" :loading="loading" style="width:100%" size="medium" type="primary" round>INGRESAR</el-button>
  </div>
</template>
<script>
import loginService from "@/services/loginService";
import _r from "@/utils/responseManager";
export default {
  data: () => ({
    usuario: "jarriaza",
    clave: "123456",
    loading: false,
    editable: true
  }),
  methods: {
    async onLogin() {
      this.editable = false;
      this.loading = true;
      let respuesta = await loginService.serviceLogin({
        usuario: this.usuario,
        clave: this.clave
      });
      if (_r.verifyResponse(respuesta).isOk) {
        this.$router.push("/cliente");
      }
      this.editable = false;
      this.loading = true;
    }
  }
};
</script>
<style scoped>
.iop-login-input {
  margin: 15px 0;
}
.iop-inputs-container {
  margin: 30px 0;
}
</style>
