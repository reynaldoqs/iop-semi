<template>
  <div class="steeper-container iop-card" style="padding:20px 30px 40px 30px">
      <formInformation title="Respuestas" description="Muestra los parámetros registrados en la ruta.">
          <v-btn v-if="selectedCodigo === -1" icon flat :color="!selectedId?'blue-grey':'teal'" @click="cleanForm">
            <v-icon>add</v-icon>
          </v-btn>
           <v-btn  v-else icon flat :color="!selectedId?'teal':'blue-grey'" @click="isMain = true; selectedCodigo =-1">
            <v-icon>keyboard_backspace</v-icon>
          </v-btn>
      </formInformation>
     <transition name="fade" mode="out-in">
    <div v-if="isMain">
    <v-form @submit.prevent="guardar" ref="formRespuestas" v-model="valid">
      <v-layout row wrap>
        <v-flex xs6 md2 class="iop-right-spacer">
          <v-text-field
            v-model.number="model.codigoHttp"
            label="Código HTTP"
            outline
            :rules="[rules.req, rules.integer]"
            :disabled="!hasId"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md2 class="iop-left-spacer iop-right-spacer">
          <v-text-field
            v-model="model.tipoContenido"
            label="Tipo"
           outline
            disabled
            style="font-size:14px"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md8 class="iop-left-spacer">
         <v-text-field
            v-model="model.descripcion"
            label="Descripción"
            outline
            :rules="[rules.req]"
            :disabled="!hasId"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 style="text-align:right;margin-bottom:20px">
              <v-btn
                v-if="!selectedId"
                :disabled="!valid || !hasId"
                color="teal"
                dark
                fab
                @click.stop="agregar"
                :loading="loading"
              >
                <v-icon style="transition:1s all;transform:rotate(-90deg)" :class="{'arrow-down':valid}">forward</v-icon>
              </v-btn>
              <v-btn
                v-else
                :disabled="!valid || !hasId"
                color="teal"
                dark
                fab
                @click.stop="actualizar"
                :loading="loading"
              >
                <v-icon style="transition:1s all;transform:rotate(-90deg)" :class="{'arrow-down':valid}">autorenew</v-icon>
              </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
      <div class="s-chips-container">
       <steepers-chips  v-on:deleteItem="deleteItem" v-on:editItem="editItem"  isEditable v-on:addRespuestas="addParametros"  v-for="item in items" :key="item.id" :title="item.codigoHttp" :idRespuesta="item.id"/>
      </div>
    </div>
    <RutasDetailRespuestasParametros :idRespuesta="selectedRespId" :codigoHttp="selectedCodigo" v-else/>
     </transition>
  </div>
</template>
<script>
import formInformation from '@/moduloAdministrador/components/shared/formComponents/formInformationBar'
import SteepersChips from '@/moduloAdministrador/components/rutas/SteepersChips'
import rules from '@/config/formRules'
import rutasApi from '@/services/rutasService'
import RutasDetailRespuestasParametros from '@/moduloAdministrador/components/rutas/RutasDetailRespuestasParametros'
import answersModule from '@/utils/responseManager'
import checkModule from '@/utils/checkChanges'
export default {
  data () {
    return {
      idRuta: null,
      isMain: true,
      loading: false,
      valid: true,
      selectedId: null,
      model: {
        descripcion: null,
        codigoHttp: null,
        tipoContenido: 'aplication/json'
      },
      oldModel: null,
      items: [],
      selectedCodigo: -1,
      selectedRespId: -1
    }
  },
  methods: {
    cleanForm () {
      this.selectedId = null
      this.resetForm()
    },
    editItem (id) {
      this.selectedId = id
      let indexSelected = this.items.findIndex(data => data.id === id)
      this.oldModel = Object.assign({}, this.items[indexSelected])
      this.model = Object.assign({}, this.items[indexSelected])
    },
    async deleteItem (id) {
      let indexSelected = this.items.findIndex(data => data.id === id)
      if (indexSelected !== -1) {
        let respuesta = await rutasApi.deleteCodRespuesta(this.idRuta, id)
        if (answersModule.verifyPetition(respuesta).isOk) { this.items.splice(indexSelected, 1) }
      }
    },
    async actualizar () {
      try {
        this.loading = true
        let fromForm = checkModule.checkIt(this.oldModel, this.model)
        let respuesta = await rutasApi.patchCodRespuesta(
          this.idRuta,
          this.selectedId,
          fromForm
        )
        if (answersModule.verifyPetition(respuesta).isOk) {
          // updateAMD: mejorar para que no haga get para actualizar la lista
          this.resetForm()
          this.loadCodsRespuestas()
          this.selectedId = null
        }

        this.loading = false
      } catch (err) {
        console.error(err)
      }
    },
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
    addParametros (val) {
      if (val) {
        this.selectedCodigo = val.codigoHttp
        this.selectedRespId = val.idRespuesta
        this.isMain = false
      } else {
        this.selectedCodigo = -1
        this.selectedRespId = -1
      }
    },
    async loadCodsRespuestas () {
      let respuesta = await rutasApi.getCodsRespuestas(this.idRuta)
      if (answersModule.verifyPetition(respuesta).isOk) { this.items = answersModule.verifyPetition(respuesta).answer.respuestas }
    },
    resetForm () {
      this.$refs.formRespuestas.reset()
      this.model.tipoContenido = 'aplication/json'
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
  mounted () {
    this.idRuta = this.$route.params.id
    this.loadCodsRespuestas()
    this.selectedCodigo = -1
  },
  components: {
    SteepersChips,
    RutasDetailRespuestasParametros,
    formInformation
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
