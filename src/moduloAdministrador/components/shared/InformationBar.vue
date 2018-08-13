<template>
  <div class="bar-container">
    <v-layout row wrap class="text-xs-center text-md-left">
      <v-flex xs12 class="information-section">
        <div class="information-container">
          <div class="header">
            <div>{{information.title}}</div>
            <div v-if="aditionals">
              <div v-for="(aditional,index) in Object.keys(aditionals)" :key="index" class="items-adicionales">
                <span>{{aditional}}:</span>
                <span>{{aditionals[aditional]}}</span>
              </div>
            </div>
          </div>
          <div>
            {{information.description}}
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      busqueda: ""
    };
  },
  props: {
    information: {
      type: Object,
      required: true
    },
    aditionals: {
      type: Object,
      required: false
    }
  }
};
</script>

<style scoped>
.bar-container {
  position: relative;
  background-color: var(--ds-bg-3);
  padding: 10px 16px;
  border-radius: 3px;
  margin: 10px 0;
}
.information-section {
  display: flex;
  align-items: center;
}
.information-container {
  padding: 5px;
}
.header {
  color: var(--ds-txt-1);
  font-size: 1.8rem;
  letter-spacing: 1px;
  margin-bottom: 10px;
  font-weight: 700;
  display: inline-flex;
  text-transform: capitalize;
}
.header > div:first-child {
  margin-right: 30px;
}
.items-adicionales:not(:last-child) {
  margin-right: 15px;
}
.items-adicionales {
  position: relative;
  top: -1px;
  display: inline-flex;
}
.items-adicionales > span:first-child {
  font-size: 14px;
  font-weight: 400;
  color: var(--ds-bg-1);
  letter-spacing: 0.5px;
}
.items-adicionales > span:last-child {
  font-size: 13px;
  letter-spacing: 0.5px;
  margin: 0 3px;
  padding-top: 1px;
  padding-left: 3px;
  font-weight: 400;
  color: white;
}
.information-container > div:last-child {
  color: #a1b1b1;
  letter-spacing: 0.5px;
  word-spacing: 1.5px;
  font-size: 1rem;
  line-height: 1.3rem;
  margin-bottom: 4px;
  font-weight: 300;
}
</style>