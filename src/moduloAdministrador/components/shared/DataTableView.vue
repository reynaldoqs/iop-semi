<template>
  <div class="my-auto-x-scroll">
    <v-data-table :headers="datos.headers"
    :items="datos.items"
    :pagination.sync="pagination"
    :total-items="datos.totalItems"
    :loading="loading"
    @update:pagination="pagUpdate"
    class="elevation-12"
    >

      <template slot="headers" slot-scope="props">
              <tr :active="props.selected">
                <th class="text-xs-left" v-for="(column, index) in props.headers" :key="index">
                  <div class="inter-headers">
                    {{ column.text}}
                  </div>
                </th>
              </tr>
</template>

<template slot="items" slot-scope="props">
  <td :data-metodo="props.item.data1">
    <router-link v-if="deep" :to="{ name: `detail-${tipo}`, params: { id: `${props.item.id}` }}" class="inter-link">{{ props.item.data1}}</router-link>
    <router-link v-else :to="`${tipo}/detail/${props.item.id}`" class="inter-link">{{ props.item.data1}}</router-link>
  </td>
  <td :data-metodo="props.item.data2">{{ props.item.data2 }}</td>
  <td :data-metodo="props.item.data3">{{ props.item.data3 }}</td>
  <td :data-metodo="props.item.data4">{{ props.item.data4 }}</td>
  <td>
    <v-btn color="white" flat icon> <v-icon left small style="position:relative; left:8px">delete</v-icon></v-btn>
  </td>
</template>
  </v-data-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 10
      }
    }
  },
  methods: {
    pagUpdate () {
      this.$emit('onUpdatePagination', this.pagination)
    }
  },
  props: {
    datos: {
      type: Object
    },
    tipo: {
      type: String
    },
    loading: {
      type: Boolean
    },
    deep: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style>
.inter-headers {
  background-color: transparent;
  font-size: 1.1rem;
  color: var(--ds-txt-1);
  font-weight: 700;
}
.inter-link {
  font-size: 1rem;
  color: var(--ds-txt-3);
  text-decoration: none;
}
.inter-link:hover {
  text-decoration: underline;
}
</style>
