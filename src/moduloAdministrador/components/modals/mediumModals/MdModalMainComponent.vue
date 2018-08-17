<template>
  <div>
    <v-dialog v-model="dialog" max-width="500" persistent lazy>
      <v-card>
        <component :is="currentComponent" v-bind="currentProperties"></component>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import EventBus from '@/utils/eventBus'
import CreateUser from '@/moduloAdministrador/components/accountSettings/createUser'
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
    'create-user': CreateUser
  },
  watch: {
    dialog () {
      if (!this.dialog) {
        // para destruir el componente
        this.currentComponent = ''
      }
    }
  },
  mounted () {
    EventBus.$on('open-md-modal', (type, id = '') => {
      this.idServicio = id
      this.currentComponent = type
      this.dialog = true
    })
    EventBus.$on('close-md-modal', () => {
      this.dialog = false
    })
  },
  beforeDestroy () {
    EventBus.$off('open-md-modal')
    EventBus.$off('close-md-modal')
  }
}
</script>
