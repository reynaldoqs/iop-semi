<template>
  <div id="iop-modal-header">
    <div>
    <v-progress-linear
      background-color="grey"
      style="width:100%;position:absolute;top:-14px"
      color="white"
      height="2"
      value="15"
      indeterminate
      v-if="loading"
    ></v-progress-linear>
    <div class="modals-header" >
      <div>
        <v-icon>{{icon}}</v-icon>
        <div class="modal-information">
          <h3>{{title}}</h3>
          <small>{{description}}</small>
        </div>
      </div>
      <div>
        <v-btn @click.stop="close()" flat icon small><v-icon :small="isNested">close</v-icon></v-btn>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import EventBus from '@/utils/eventBus'
export default {
  name: 'modals-header',
  data () {
    return {
      json: {
        msg: 'demo of jsoneditor'
      }
    }
  },
  props: {
    icon: {
      type: String,
      default: 'description'
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    isNested: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('onClose')
    }
  }
}
</script>
<style scoped>
.modals-header {
  width: 100%;
  background-color: var(--ds-bg-1);
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modals-header > div {
  display: flex;
}
.modal-information {
  padding: 6px 0 0 15px;
}
.modal-information h3 {
  line-height: 14px;
}
.modal-information small {
  line-height: 5px;
}
</style>
