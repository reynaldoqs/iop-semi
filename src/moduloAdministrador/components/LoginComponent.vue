<template>
  <div class="login-component">
    <div class="login-header">
      <img src="../assets/logoWhite.svg" width="60px" alt="" style="margin: 20px auto">
    <!--   <h1>Plataforma de <strong>Interoperabilidad</strong></h1> -->
    </div>
    <v-form v-model="valid" @submit.prevent="componentLogin" class="iop-login">
      <v-text-field prepend-icon="person" :disabled="status === 'loading'" v-model="username" :rules="[rules.req]" label="Usuario"></v-text-field>
      <v-text-field prepend-icon="lock"  :disabled="status === 'loading'" v-model="password" :rules="[rules.req]" label="Contraseña"></v-text-field>
      <div style="text-align:center">
        <div class="login-buttons">
          <v-btn v-if="!isLoggedIn" block type="submit" :loading="status === 'loading'" round color="teal" :disabled="status === 'loading'" class="white--text">
            Login
          </v-btn>
          <v-btn v-else round flat outline @click="componentLogout" class="white--text">
            Logout
          </v-btn>
        </div>
      </div>
    </v-form>
    <div class="login-links">
      <ActionsList/>
    </div>
  </div>
</template>

<script>
import rules from '@/config/formRules'
import EventBus from '@/utils/eventBus'
import ActionsList from '@/moduloAdministrador/components/ActionsList'
export default {
  data () {
    return {
      valid: true,
      username: 'jarriaza',
      password: '123456'
    }
  },
  props: ['isLoggedIn', 'status'],
  methods: {
    componentLogin () {
      this.$emit('onLogin', {
        usuario: this.username,
        clave: this.password
      })
    },
    componentLogout () {
      this.$emit('onLogout')
    }
  },
  computed: {
    rules () {
      return rules
    }
  },
  components: {
    ActionsList
  }
}
</script>

<style scoped>
.login-header {
  text-align: center;
}

.login-header > h1 {
  color: #919191;
  font-size: 1.2rem;
  font-weight: 400;
  margin: 15px 0 30px 0;
}

.login-buttons > button {
  margin: 30px 0 10px 0;
}
</style>
