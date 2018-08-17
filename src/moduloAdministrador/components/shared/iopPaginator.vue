<template>
  <div id="iop-paginator" class="paginator-container">

              <v-btn icon flat value="left" color="teal">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            <div class="list-container">
              <span class="list-index" v-for="(pag,index) in totalPaginas" :key="index">
                {{pag}}
              </span>
            </div>
              <v-btn icon flat value="justify" color="teal">
                <v-icon>chevron_right</v-icon>
              </v-btn>
  </div>
</template>
<script>
export default {
  name: 'iop-paginator',
  data: () => ({ current: 'center' }),
  props: {
    pagina: {
      type: Number,
      default: 1
    },
    limite: {
      type: Number,
      default: 10
    },
    totalItems: {
      type: Number,
      default: 0
    },
    totalPaginas: {
      type: Number,
      default: 10
    }
  },
  methods: {
    next () {}
  }
}
</script>
<style scoped>
#iop-paginator button {
  text-transform: capitalize;
  font-weight: 300;
}
.paginator-container {
  display: inline-flex;
  align-items: center;
}
.list-index {
  font-weight: 300;
  font-size: 1.2rem;
  cursor: pointer;
}
.list-index:not(:last-child) {
  margin-right: 5px;
}
</style>
