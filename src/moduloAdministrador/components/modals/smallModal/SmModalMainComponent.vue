<template>
  <div>
    <v-dialog v-model="dialog" max-width="400" lazy>
      <v-card>
        <component :is="currentComponent" v-bind="currentProperties"></component>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import EventBus from '@/utils/eventBus'
import SelectAmbiente from '@/moduloAdministrador/components/modals/SelectAmbiente'
export default {
  name: 'medium-modal',
  data () {
    return {
      dialog: false,
      currentComponent: '',
      someId: null
    }
  },
  computed: {
    currentProperties () {
      if (this.currentComponent === 'select-ruta') {
        return {
          idServicio: this.someId
        }
      }
    }
  },
  components: {
    'select-ambiente': SelectAmbiente
  },
  watch: {
    dialog () {
      if (!this.dialog) {
        this.currentComponent = ''
      }
    }
  },
  mounted () {
    EventBus.$on('open-sm-modal', (type, id = '') => {
      this.idServicio = id
      this.currentComponent = type
      this.dialog = true
    })
    EventBus.$on('close-sm-modal', () => {
      this.dialog = false
    })
  },
  beforeDestroy () {
    EventBus.$off('open-sm-modal')
    EventBus.$off('close-sm-modal')
  }
}
</script>
