<template>
    <v-tooltip
      :right="right"
      :left="left"
      :bottom="bottom"
      color="white"
      max-width="300"
      close-delay="150"
      >
      <slot slot="activator"></slot>
      <div v-bind:class="[bottom? 'bottom-arrow' : 'right-arrow']" style="position:relative;">
        <div style="display:block" class="iop-tooltip-container">
        <h3 class="iop-tooltip-title">{{title}}</h3>
        <span class="iop-tooltip-description">{{description}}</span>
      </div>
      </div>
    </v-tooltip>
</template>
<script>
export default {
  name: "iop-toolTip",
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    right: {
      type: Boolean,
      required: false,
      default: false
    },
    left: {
      type: Boolean,
      required: false,
      default: false
    },
    bottom: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>
<style>
.iop-tooltip-container {
  position: relative;
  padding: 4px;
}
.bottom-arrow::after {
  content: "";
  width: 15px;
  height: 15px;
  position: absolute;
  background-color: white;
  margin: 0 auto;
  transform: rotate(45deg);
  top: -8px;
  left: calc(50% - 15px);
}
.right-arrow::after {
  content: "";
  width: 15px;
  height: 15px;
  position: absolute;
  background-color: white;
  transform: rotate(45deg);
  left: -12px;
  top: calc(50% - 7px);
}
.iop-tooltip-title {
  color: var(--inter-primary);
  font-weight: 400;
}
.iop-tooltip-description {
  color: var(--inter-secondary);
  font-weight: 300;
}
</style>

