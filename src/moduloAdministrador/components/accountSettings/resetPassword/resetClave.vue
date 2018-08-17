<template>
  <div>
    <div class="reset-bg">
      <div class="static-modal-container">
        <div class="static-modal">
          <div class="static-modal-header">
            <div class="mid-items">
              <h1>Cambio de contraseña</h1>
              <p>In alias debitis perspiciatis, repudiandae deleniti at voluptas sequi quo autem quasi error unde? Earum obcaecati perferendis odio quos.</p>
            </div>
          </div>
          <div class="static-modal-form">
              <security-nivel :nivel="nivel"></security-nivel>
            <h3>Constraseña nueva</h3>
            <password v-model="password1" placeholder="Nueva contraseña"
            :toggle="toggle"
            @score="showScore"
            name="pass 1"
            id="pass1"
            :badge="false"
            :showStrengthMeter="strMeter"
            />
            <h3>Repita la contraseña</h3>
          <password v-model="password2" placeholder="Repita contraseña"
            :toggle="toggle"
            name="pass 2"
            id="pass2"
            :badge="false"
            :showStrengthMeter="strMeter"
            />
            <div class="error-message">{{errorMessage}}</div>
            <div class="button-container">
              <v-btn color="primary" @click="guardar" :disabled="errorMessage.length > 0 || password1 === null || password2 === null">Guardar contraseña</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Password from 'vue-password-strength-meter'
import securityNivel from '@/moduloAdministrador/components/accountSettings/securityNivel'
import loginApi from '@/services/loginService'
export default {
  data: () => ({
    password1: null,
    password2: null,
    toggle: true,
    score: null,
    strMeter: false,
    nivel: 0,
    errorMessage: ''
  }),
  methods: {
    showScore (score) {
      this.nivel = score
    },
    guardar () {
      loginApi.serviceRestPassword(this.$route.params.clave, {
        clave: this.password1,
        confirmacionClave: this.password2
      })
    }
  },
  components: {
    Password,
    securityNivel
  },
  watch: {
    password1 () {
      if (this.password2 !== null) {
        this.password1 === this.password2
          ? (this.errorMessage = '')
          : (this.errorMessage = 'Las contraseñas no coinciden')
      }
    },
    password2 () {
      if (this.password1 !== null) {
        this.password1 === this.password2
          ? (this.errorMessage = '')
          : (this.errorMessage = 'Las contraseñas no coinciden')
      }
    }
  }
}
</script>

<style scoped>
.error-message {
  padding: 10px;
  color: #f44336;
  min-height: 40px;
}
.button-container {
  width: 100%;
  padding: 10px 0;
  margin-bottom: 20px;
}
.button-container > button {
  width: 100%;
}
.reset-bg {
  background-color: var(--inter-primary);
  width: 100%;
  height: 100vh;
}
.mid-items {
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 20px 16px;
}
.static-modal-container {
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.static-modal {
  width: 450px;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  overflow: hidden;
}

.static-modal-header {
  width: 100%;
  min-height: 100px;
  background-color: var(--inter-tertiary);
}

.static-modal-form {
  padding: 10px 37px;
  color: var(--ds-bg-2);
}
</style>
