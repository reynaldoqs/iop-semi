<template>
  <div class="steeper-container">
     <transition name="fade" mode="out-in">
    <div v-if="isMain">
    <v-form @submit.prevent="guardar" ref="formRespuestas" v-model="valid">
      <v-layout row wrap>
        <v-flex xs6 md2 class="iop-right-spacer">
          <v-text-field
            v-model.number="model.codigoHttp"
            placeholder="Código HTTP"
            solo
            flat
            single-line
            :rules="[rules.req, rules.integer]"
            :disabled="!hasId"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md2 class="iop-left-spacer iop-right-spacer">
          <v-text-field
            v-model="model.tipoContenido"
            placeholder="Tipo"
            solo
            flat
            single-line
            disabled
            style="font-size:14px"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md8 class="iop-left-spacer">
         <v-text-field
            v-model="model.descripcion"
            placeholder="Descripción"
            solo
            flat
            single-line
            :rules="[rules.req]"
            :disabled="!hasId"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 style="text-align:right; padding-right:20px">
              <v-btn
                :disabled="!valid || !hasId"
                color="teal"
                dark
                fab
                small
                @click.stop="agregar"
                style="position:relative; top:-12px;"
                :loading="loading"
              >
                <v-icon style="transition:1s all;transform:rotate(-90deg)" :class="{'arrow-down':valid}">forward</v-icon>
              </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
      <div class="s-chips-container">
       <steepers-chips v-on:addRespuestas="editar" v-for="item in items" :key="item.id" :title="item.codigoHttp" :description="item.descripcion" :idRespuesta="item.id"/>
      </div>
    </div>
    <SteepRespuestasParametros v-on:onBack="back" :idRespuesta="selectedRespId" :codigoHttp="selectedCodigo" v-else/>
     </transition>
  </div>
</template>
<script>
import SteepersChips from '@/moduloAdministrador/components/rutas/SteepersChips'
import rules from '@/config/formRules'
import rutasApi from '@/services/rutasService'
import SteepRespuestasParametros from '@/moduloAdministrador/components/rutas/SteepRespuestasParametros'
import answersModule from '@/utils/responseManager'
export default {
  data () {
    return {
      isMain: true,
      loading: false,
      valid: true,
      model: {
        descripcion: null,
        codigoHttp: null,
        tipoContenido: 'aplication/json'
      },
      items: [],
      selectedCodigo: -1,
      selectedRespId: -1
    }
  },
  props: {
    idRuta: {
      type: String,
      default: null
    }
  },
  methods: {
    async agregar () {
      try {
        this.loading = true
        let fromForm = Object.assign({}, this.model)
        let respuesta = await rutasApi.postCodRespuesta(this.idRuta, fromForm)
        if (answersModule.verifyPetition(respuesta).isOk) {
          let nuevoCodigo = answersModule.verifyPetition(respuesta).answer
          this.items.push(nuevoCodigo)
          this.resetForm()
        }
        this.loading = false
      } catch (err) {
        console.error(err)
      }
    },
    editar (val) {
      if (val) {
        this.selectedCodigo = val.codigoHttp
        this.selectedRespId = val.idRespuesta
        this.isMain = false
      } else {
        this.selectedCodigo = -1
        this.selectedRespId = -1
      }
    },
    resetForm () {
      this.$refs.formRespuestas.reset()
      this.model.tipoContenido = 'aplication/json'
    },
    back () {
      this.isMain = true
    }
  },
  computed: {
    rules () {
      return rules
    },
    hasId () {
      return !!this.idRuta
    }
  },
  components: {
    SteepersChips,
    SteepRespuestasParametros
  }
}
</script>
<style scoped>
.s-chips-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 16px;
  max-height: 73%;
  overflow-y: auto;
}

.arrow-down {
  transform: rotate(90deg) !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
