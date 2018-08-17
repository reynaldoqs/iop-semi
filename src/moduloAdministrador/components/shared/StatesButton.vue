<template>
  <div>

    <div class="circlet-container">
    <v-tooltip top>
      <v-btn
        style="margin:0;position:relative;top:1px;"
        slot="activator"
        dark
        icon
        :loading="loading"
        flat
        color="blue"
      >
         <v-icon :style="{color:color}" small>{{icon}}</v-icon>
      </v-btn>
       <span class="operation">{{operation}}</span>
    </v-tooltip>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    operation: {
      type: String,
      default: 'Verificar'
    },
    icon: {
      type: String,
      default: 'add'
    },
    color: {
      type: String,
      default: 'white'
    }
  }
}
</script>
<style scoped>
.operation {
  position: relative;
  font-weight: 700;
  color: var(--ds-txt-1);
  font-size: 0.9rem;
}
.circlet-container {
  /*   background-color: var(--ds-bg-2);
  border-radius: 50%;
  padding: 0;
  box-shadow: inset 0 3px 6px rgba(250, 250, 250, 0.05); */
}
</style>
