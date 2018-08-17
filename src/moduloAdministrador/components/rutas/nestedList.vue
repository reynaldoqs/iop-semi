<template>
  <div class="nested-list">
    <div class="label-wrapper" @click="toggleChildren">
      <div :style="indent" class="labelClasses">
          <v-tooltip top>
            <div slot="activator" class="nested-nombre-container">{{ label.nombre }}</div>
            <span>{{label.nombre}}</span>
          </v-tooltip>
        <v-icon  v-if="nodes" v-text="this.showChildren?'expand_more':'chevron_right'" small></v-icon>
      </div>
      <div class="nested-opt-container">
        <span>{{label.ubicacion}}</span>
        <span>{{label.tipo}}</span>
        <span>{{label.formato}}</span>
      <v-btn small icon @click.stop="deleteChildren(label.id)">
        <v-icon small>delete</v-icon>
      </v-btn>
      </div>
    </div>
<transition-group name="slide-fade" tag="div">
    <nested-list
      v-if="showChildren"
      v-for="(node,i) in nodes"
      :nodes="node.hijos"
      :label="node"
      :depth="depth + 1"
      :key="i"
    >
    </nested-list>
</transition-group>
  </div>
</template>

<script>
import rutasApi from '@/services/rutasService'
export default {
  props: ['label', 'nodes', 'depth'],
  data () {
    return { showChildren: false }
  },
  name: 'nested-list',
  computed: {
    indent () {
      return { transform: `translate(${this.depth * 30}px)` }
    }
  },
  methods: {
    toggleChildren () {
      this.showChildren = !this.showChildren
    },
    deleteChildren (id) {
      alert(id)
    }
  }
}
</script>

<style>
.nested-opt-container {
  width: 450px;
  max-width: 80%;
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.labelClasses {
  margin-right: auto;
}
.nested-list {
  width: 100%;
  cursor: pointer;
}
.nested-list .label-wrapper {
  padding: 10px;
  width: 100%;
  padding-left: 50px;
  padding-right: 85px;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(110, 110, 100, 0.3);
}
/* .nested-list .label-wrapper:not(:last-child) {
  border-bottom: 1px solid rgba(110, 110, 100, 0.3);
} */
.nested-list .label-wrapper .has-children {
  cursor: pointer;
}
.nested-nombre-container {
  max-width: 70px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  position: relative;
  top: 5px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
