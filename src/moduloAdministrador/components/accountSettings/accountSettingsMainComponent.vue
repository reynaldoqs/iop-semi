<template>
  <div>
    <v-dialog v-model="dialog" max-width="450" lazy>
      <v-card>
        <component v-bind:is="currentTabComponent"></component>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import EventBus from '@/utils/eventBus'
import changePassword from '@/moduloAdministrador/components/accountSettings/changePassword'
import createUser from '@/moduloAdministrador/components/accountSettings/createUser'
export default {
  data () {
    return {
      dialog: false,
      currentTabComponent: ''
    }
  },
  components: {
    'change-pass': changePassword,
    'create-user': createUser
  },
  watch: {
    dialog () {
      if (!this.dialog) {
        this.currentTabComponent = ''
      }
    }
  },
  mounted () {
    EventBus.$on('settings', item => {
      this.currentTabComponent = item
      this.dialog = true
    })
    EventBus.$on('closeModal', () => {
      this.dialog = false
    })
  },
  beforeDestroy () {
    EventBus.$off('settings')
    EventBus.$off('closeModal')
  }
}
</script>
