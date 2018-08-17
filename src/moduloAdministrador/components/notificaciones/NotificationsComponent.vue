<template>
      <v-snackbar
      :timeout="time"
      v-model="isOn"
      right
      top
      multi-line
      white
      auto-height
      :color="dangerous ?'red lighten-1':'green darken-1'"
    >
    <div class="inter-snack-bar">
        <div class="snack-icon">
          <v-icon v-text="dangerous ?'error_outline':'check_circle_outline'"></v-icon>
        </div>
        <div class="snack-container">
          <span v-text="dangerous ?'Error':'Correcto'" class="snack-title"></span>
          <span class="snack-message">{{message}}</span>
        </div>
    </div>
    </v-snackbar>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isOn', 'dangerous', 'time', 'message'])
  }
}
</script>
<style scoped>
.inter-snack-bar {
  max-width: 300px;
  display: flex;
  text-align: left;
}

.snack-title {
  text-decoration: underline;
  display: block;
  margin-bottom: 5px;
}

.snack-icon {
  width: 35px;
}

.snack-message {
  font-size: 0.9rem;
  line-height: 0.5rem;
  font-weight: 400;
}
</style>
