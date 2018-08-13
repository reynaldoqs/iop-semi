<template>
  <div class="change-pass">
    <settingsHeader icon="https" title="Cambio de contraseña" description="Cambio de contraseña"/>
    <section>
      <div class="settings-modal-mid-container">
        <v-form @submit.prevent="save" ref="changeForm" v-model="valid">
          <v-layout row wrap>
  
            <v-flex xs12>
              <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="oldpass" label="Contraseña antigua" box></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-divider></v-divider>
              <span class="settings-subtitle">Nueva Contraseña</span>
            </v-flex>

            <v-flex xs12>
              <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="pass1" label="Contraseña nueva" box></v-text-field>
            </v-flex>
  
            <v-flex xs12>
              <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="pass2" label="Repita contraseña" box></v-text-field>
            </v-flex>
            <v-flex xs12>
             <div class="settings-buttons">
               <div class="settings-error">
                 {{error}}
               </div>
             <v-btn @click="save" :disabled="!valid || error.length > 0" flat round outline :loading="btnLoading">Cambiar contraseña</v-btn>
             </div>
            </v-flex>
          </v-layout>
        </v-form>
      </div>
    </section>
  </div>
</template>

<script>
import usuariosApi from "@/services/usuariosService";
import rules from "@/config/formRules";
import EventBus from "@/utils/eventBus";
import settingsHeader from "@/moduloAdministrador/components/accountSettings/settingsHeader";
export default {
  data() {
    return {
      valid: true,
      currentUser: {},
      oldpass: null,
      pass1: null,
      pass2: null,
      editable: true,
      error: "",
      btnLoading: false
    };
  },
  methods: {
    showError(err) {
      this.error = err;
    },
    save() {
      this.editable = false;
      this.btnLoading = true;
      setTimeout(() => {
        usuariosApi
          .patchUsuario(this.currentUser.id, { clave: this.pass1 })
          .then(() => {
            this.editable = true;
            this.btnLoading = false;
            this.$refs.changeForm.reset();
            EventBus.$emit("closeModal");
          });
      }, 1000);
    }
  },
  watch: {
    pass1() {
      if (this.pass2 !== null) {
        this.pass1 === this.pass2
          ? this.showError("")
          : this.showError("Las contraseñas no coinciden");
      }
    },
    pass2() {
      if (this.pass1 !== null) {
        this.pass1 === this.pass2
          ? this.showError("")
          : this.showError("Las contraseñas no coinciden");
      }
    }
  },
  mounted() {
    //ver el mejor lugar para sacar los datos del usuario (localstorage or vuex state)
    usuariosApi
      .getUsuario(JSON.parse(localStorage.getItem("user")).idUsuario)
      .then(user => {
        this.currentUser = user;
      });
  },
  computed: {
    rules() {
      return rules;
    }
  },
  components: {
    settingsHeader
  }
};
</script>

<style scoped>
/* PASARLO AL STILO GENERAL PARA EL COMPORTAMIENTO DE LOS MODALES */

.change-pass {
  width: 100%;
  background-color: var(--inter-primary);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}
.settings-information {
  text-align: center;
  margin-bottom: 20px;
}
.settings-subtitle {
  font-weight: 400;
  margin: 16px 0;
  display: block;
  font-size: 1.2rem;
}
header {
  width: 100%;
}
.settings-buttons {
  text-align: center;
  padding-bottom: 10px;
}
.settings-error {
  color: #f44336;
  height: 35px;
  text-align: left;
}
.settings-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-modal-mid-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 16px 36px;
}
</style>

