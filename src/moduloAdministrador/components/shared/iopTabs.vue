<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md3>
        <nav>
          <v-list style="background-color:transparent">
            <v-list-tile v-for="(item, index) in items" class="list-tab" :key="index" @click="selectItem(item.title)" :class="{ 'active-tab': selectedItem == item.title }">
              <v-list-tile-action>
                <v-icon style="position:relative; left:15px">{{item.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="iop-link-list-title">{{item.title}}<span class="extra-info" v-show="item.extra">{{item.extra}}</span> </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </nav>
      </v-flex>
  
      <v-flex xs12 md9>
        <transition name="component-fade" mode="out-in">
          <slot>
          </slot>
        </transition>
      </v-flex>
    </v-layout>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: "Servicios"
    };
  },
  methods: {
    selectItem(value) {
      this.selectedItem = value;
      this.$emit("selectTab", value);
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  created() {
    this.selectedItem = this.items[0].title;
  }
};
</script>

<style scoped>
/* .component-fade-enter-active,
.component-fade-leave-active {
  transition: all 0.2s;
}
.component-fade-enter {
  opacity: 0;
  transform: translateY(-100%);
}
.component-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.component-fade-leave {
  opacity: 1;
  transform: translateY(0);
}
.component-fade-leave-to {
  opacity: 0;
  transform: translateY(100%);
} */
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
nav {
  padding: 0 16px;
}

.list-tab {
  background-color: transparent;
  transition: 0.3s all;
  border-radius: 5px;
  overflow: hidden;
}

.active-tab {
  background-color: var(--ds-bg-1);
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.22);
}
.extra-info {
  margin-left: 10px;
  font-size: 12px;
  color: #f44336;
  font-style: italic;
}
</style>
