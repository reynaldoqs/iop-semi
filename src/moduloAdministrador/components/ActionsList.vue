<template>
    <div class="list-container">
      <ul class="list-nav">
        <li @click.stop="modalCreateUser">
          <span class="list-links">Crear un nuevo usuaro</span>
        </li>
        <li>
          <span class="list-links">Recuperar contraseña</span>
        </li>
      </ul>
    </div>  
</template>
<script>
import EventBus from "@/utils/eventBus";
export default {
  name: "list-links",
  methods: {
    modalCreateUser() {
      EventBus.$emit("open-modal");
      EventBus.$emit(
        "set-modal-data",
        {
          icon: "person_add",
          description: "Formulario para crear un nuevo usuario"
        },
        "Registrar usuario",
        600
      );
    }
  }
};
</script>

<style scoped>
.list-container {
  width: 100%;
  display: flex;
}
.list-nav {
  display: inline-block;
  max-width: 50%;
  list-style: none;
  margin: 20px 0 10px 0;
  padding: 0 0 0 15px;
  position: relative;
}
.list-nav::before {
  content: "";
  width: 2px;
  border-radius: 3px;
  /*   background: linear-gradient(
    45deg,
    var(--inter-secondary),
    var(--inter-primary),
    var(--inter-secondary)
  ); */
  background-color: var(--inter-primary);
  height: 100%;
  position: absolute;
  left: 0;
}

.list-nav > li:not(:last-child) {
  list-style: none;
  margin-bottom: 8px;
}
.list-links {
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.1px;
  cursor: pointer;
  font-weight: 500;
}
.list-links:hover {
  font-weight: 700;
  color: var(--ds-txt-3);
}
</style>