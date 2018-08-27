<template>
    <div class="container">
        <h1>Plataforma de <strong>Interoperabilidad</strong></h1>
        <p>Registro y sharing de servicos para el pais</p>
        <button>
            Ingresar
        </button>
        <router-link class="link" to="/login">No tengo una cuenta aún</router-link>
    </div>
</template>
<script>
export default {
  name: "main-view"
};
</script>

<style scoped>
.container {
  text-align: center;
  vertical-align: auto;
}
h1 {
  color: #f1f1f1;
  font-weight: 300;
  margin: 5px 0;
  font-size: 36px;
  font-weight: 600;
  font-family: Open Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica, Arial, sans-serif;
}
h1 > strong {
  font-weight: 700;
}
p {
  color: #f1f1f1;
  margin: 5px 0;
  font-weight: 300;
  font-size: 16px;
  font-family: Open Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica, Arial, sans-serif;
  margin-bottom: 135px;
}
button {
  color: #f1f1f1;
  font-weight: 700;
  width: 200px;
  border-radius: 25px;
  border: none;
  padding: 12px 10px;
  margin: 0 auto;
  background-color: #03a9f4;
  font-family: Open Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica, Arial, sans-serif;
  font-size: 16px;
  text-transform: uppercase;
  position: relative;
  transition: 0.3s all ease-out;
  cursor: pointer;
}
button:hover {
  transform: translateY(-3px);
  background-color: #23b9f4;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}
button:focus {
  outline: none;
}
.link {
  display: block;
  padding: 0;
  font-size: inherit;
  line-height: normal;
  text-decoration: none;
  color: #26aded;
  cursor: pointer;
  margin-top: 40px;
}
.link:hover {
  text-decoration: underline;
}
</style>
