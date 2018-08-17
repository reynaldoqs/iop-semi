<template>
  <div>
    <v-stepper v-model="e1" alt-labels>
      <v-stepper-header>
        <template v-for="(step, index) in iopSteps">
          <v-stepper-step
            :complete="e1 > index + 1"
            :key="index + 1"
            :step="index + 1"
            editable
            edit-icon="check"
            color="teal"
          >
           <small style="text-align: center;font-weight:700; color:white">{{ step.title }}</small>
           <small style="text-align: center">{{step.description}}</small>
          </v-stepper-step>

          <v-divider
            v-if="index !== iopSteps.length - 1"
            :key="index.description"
          ></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="(step, index) in iopSteps"
          :key="step.title"
          :step="index+1"
        >
        <transition name="component-fade" mode="out-in">
          <component v-bind:is="step.component" :idRuta="globalIdRuta" v-on:answerDetalles="saveDetalles"></component>
        </transition>
          <v-btn
            color="teal"
            @click="nextStep(index+1)"
            :loading="btnLoading"
            style="text-transform:capitalize"
          >
            {{e1 === iopSteps.length?'Finalizar':'Continuar'}}
            <v-icon right small v-text=" e1 === iopSteps.length?'check':'chevron_right'"></v-icon>
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
<div v-show="!globalIdRuta" class="error-console">
  {{errorMessage}}
</div>
  </div>
</template>
<script>
import SteepDetalles from '@/moduloAdministrador/components/rutas/SteepDetalles'
import SteepParametros from '@/moduloAdministrador/components/rutas/SteepParametros'
import SteepRespuestas from '@/moduloAdministrador/components/rutas/SteepRespuestas'
import EventBus from '@/utils/eventBus'
import rutasApi from '@/services/rutasService'
import answersModule from '@/utils/responseManager'
export default {
  data () {
    return {
      btnLoading: false,
      globalIdRuta: null,
      e1: 1,
      errorMessage: 'ruta sin registrar',
      iopSteps: [
        {
          title: 'Detalles',
          description: 'Datos generales de la ruta.',
          component: 'SteepDetalles',
          isCompleted: false,
          isValid: false
        },
        {
          title: 'Parámetros',
          description: 'Parámetros de la ruta',
          component: 'SteepParametros',
          isCompleted: false,
          isValid: false
        },
        {
          title: 'Respuestas',
          description: 'Las respuestas de la ruta',
          component: 'SteepRespuestas',
          isCompleted: false,
          isValid: false
        }
      ]
    }
  },

  methods: {
    async saveDetalles (detallesModel) {
      if (Object.values(detallesModel).some(data => data === null)) {
        this.errorMessage = 'datos erroneos al registrar la ruta'
      } else {
        try {
          let dataToSave = Object.assign(detallesModel, {
            idServicio: this.$route.params.id
          })

          let respuesta = await rutasApi.postRuta(detallesModel)
          if (answersModule.verifyPetition(respuesta).isOk) {
            this.globalIdRuta = answersModule.verifyPetition(
              respuesta
            ).answer.id
            this.detallesValid = true
          }
        } catch (err) {
          console.error(err)
        }
      }
    },
    askDetalles () {
      EventBus.$emit('askDetalles')
    },
    nextStep (n) {
      this.btnLoading = true
      if (n === 1 && this.globalIdRuta === null) {
        this.askDetalles()
      }
      if (n === this.iopSteps.length) {
        this.$emit('closeModal')
        this.btnLoading = false
      } else {
        this.e1 = n + 1
        this.btnLoading = false
      }
    }
  },
  components: {
    SteepDetalles,
    SteepParametros,
    SteepRespuestas
  }
}
</script>
<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
.steeper-container {
  height: 510px;
}
.steeper-form-padding {
  padding: 5px;
  background-color: rebeccapurple;
}
.error-console {
  font-family: "Courier New", Courier, monospace;
  background-color: #d32f2f;
  padding: 2px;
  font-size: 12px;
  color: white;
  padding-left: 30px;
}
</style>
