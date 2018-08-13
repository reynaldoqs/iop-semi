<template>
  <div id="app">
    <router-link to="/usuario">Usuario</router-link>
    <router-link to="/cliente">Cliente</router-link>
    <router-link to="/administrador">Administrador</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
