<template>
  <div id="rutas-list">
    <div class="table-container">
      <v-data-table
          :headers="headersFormated"
          :items="itemsFormated"
          hide-actions
          expand
        >
        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
          <td :style="{cursor:props.item.hijos?'pointer':'normal','min-width':'200px'}">{{ props.item.nombre }} <v-icon v-show="props.item.hijos" small>{{props.expanded?'expand_more':'chevron_right'}}</v-icon></td>
          <td v-if="props.item.ubicacion " class="text-xs-left">{{ props.item.ubicacion }}</td>
          <td class="text-xs-left">{{ props.item.tipo }}</td>
          <td class="text-xs-left">{{ props.item.formato }}</td>
<!--           <td class="text-xs-left"><v-icon small :color="props.item.requerido?'green':'red'">{{ props.item.requerido?'check':'close'}}</v-icon></td> -->
          <td>
            <v-btn icon small color="green" @click.stop="editIt(props.item.id)">
              <v-icon small >settings</v-icon>
            </v-btn>
            <v-btn icon small color="red" @click.stop="deleteIt(props.item.id)">
              <v-icon small >delete</v-icon>
            </v-btn>
          </td>
          </tr>
        </template>
     <template slot="expand" slot-scope="props">
      <v-card flat v-if="props.item.hijos">
          <div class="list-expand-container">
            <div v-for="(child,index) in props.item.hijos" :key="index">
             <nestedList :label="child" :nodes="child.hijos" :depth="0"/>
            </div>
          </div>
      </v-card>
    </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import nestedList from '@/moduloAdministrador/components/rutas/nestedList'
import formaterApi from '@/utils/formatJson'
import EventBus from '@/utils/eventBus'
export default {
  name: 'steepers-list-1',
  methods: {
    deleteIt (id) {
      if (id) {
        EventBus.$emit('deleteParametro', id)
      }
    },
    editIt (id) {
      if (id) {
        EventBus.$emit('editParametro', id)
      }
    }
  },
  computed: {
    headersFormated () {
      return this.headers.map(data => {
        let newHeader = {
          text: data,
          align: 'left',
          sortable: true,
          value: data
        }
        return newHeader
      })
    },
    itemsFormated () {
      // eliminar de la BD y luego hacer un splice de this items => formaterApi
      return this.isV2
        ? formaterApi.toNestedJsonV2(this.items)
        : formaterApi.toNestedJson(this.items)
    }
  },
  props: {
    headers: {
      type: Array,
      required: false
    },
    items: {
      type: Array,
      required: false
    },
    editable: {
      type: Boolean,
      default: true
    }, // parche feo para usar la segunda funcion de formatJson
    isV2: {
      type: Boolean,
      default: false
    }
  },
  components: {
    nestedList
  }
}
</script>
<style>
#rutas-list .application,
#rutas-list .theme--dark.v-table,
#rutas-list .theme--dark,
#rutas-list .v-table {
  background-color: var(--ds-bg-4) !important;
}
.rutas-chip-container {
  padding: 10px;
}
i[requerido*="tr"] {
  color: #aed581;
}
i[requerido*="fal"] {
  color: #e57373;
}
/* para la lista anidada */
.list-expand-container {
  width: 100%;
  overflow-x: hidden;
  background-color: #282828;
}
</style>
