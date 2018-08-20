<template>
    <div class="iop-nav-menu">
        <ul>
        <router-link tag="li" active-class="active" to="/cliente">Servicios</router-link>
        <router-link tag="li" active-class="active" to="/usuario">Rutas</router-link>
        <router-link tag="li" active-class="active" to="/login">Estadísticas</router-link>
        <el-button type="primary" size="medium" round>Ingresar</el-button>
        </ul>
    </div>
</template>
<style scoped>
.iop-nav-menu {
  --main-text: #f1f1f1;
  --second-text: #a4a4a4;
}
.iop-nav-menu > ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline-block;
}
.iop-nav-menu > ul > li {
  color: var(--second-text);
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
}
.iop-nav-menu > ul > li:not(:last-child) {
  margin-right: 20px;
}
.el-button {
  font-size: 14px;
  font-weight: 700;
}
.active {
  color: red;
}
</style>
