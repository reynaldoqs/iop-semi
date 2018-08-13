<template>
  <div>    
    <div class="rutas-chip-container">
      <v-chip
      close
      :color="editable?'green':'grey'"
      text-color="white"
      @input="editable?remove(index):''"
      v-for="(item, index) in items" :key="index">
        {{item}}
      </v-chip>
    </div>
  </div>
</template>
<script>
export default {
  name: "steepers-chips",
  methods: {
    remove(key) {
      this.items.splice(key, 1);
    }
  },
  props: {
    items: {
      type: Array,
      required: false
    },
    editable: {
      type: Boolean,
      default: true
    }
  }
};
</script>
