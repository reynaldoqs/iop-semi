<template>
  <div>
    <v-dialog v-model="dialog" max-width="850" lazy>
      <v-card>
        <component :is="currentComponent" v-bind="currentProperties"></component>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import EventBus from '@/utils/eventBus'
import UserAddRuta from '@/moduloAdministrador/components/modals/UserAddRuta'
export default {
  data () {
    return {
      dialog: false,
      currentComponent: '',
      idServicio: null
    }
  },
  computed: {
    currentProperties () {
      if (this.currentComponent === 'select-ruta') {
        return {
          idServicio: this.idServicio
        }
      }
    }
  },
  components: {
    'select-ruta': UserAddRuta
  },
  watch: {
    dialog () {
      if (!this.dialog) {
        this.currentComponent = ''
      }
    }
  },
  mounted () {
    EventBus.$on('modal', (type, id) => {
      this.idServicio = id
      this.currentComponent = type
      this.dialog = true
    })
    EventBus.$on('closeModal', () => {
      this.dialog = false
    })
  },
  beforeDestroy () {
    EventBus.$off('modal')
    EventBus.$off('closeModal')
  }
}
</script>
