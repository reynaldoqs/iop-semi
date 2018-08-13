<template>
  <div>
    <div class="icon-status">
      <v-icon v-bind:style="{color: nivelSeguridad.color}" v-text="nivelSeguridad.icon">
        sentiment_dissatisfieds
      </v-icon>
      <h4>Nivel de seguridad: <span v-bind:style="{color: nivelSeguridad.color}" v-text="nivelSeguridad.title">Seguro</span></h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "sec-nivel",
  props: {
    nivel: Number
  },
  computed: {
    nivelSeguridad() {
      switch (this.nivel) {
        case 0:
          return {
            title: "Nada seguro",
            icon: "sentiment_very_dissatisfied",
            color: "#f44336"
          };
        case 1:
          return {
            title: "Muy poco seguro",
            icon: "mood_bad",
            color: "#FF7043"
          };
        case 2:
          return {
            title: "Poco seguro",
            icon: "sentiment_dissatisfied",
            color: "FF9800"
          };
        case 3:
          return {
            title: "Seguro",
            icon: "sentiment_satisfied",
            color: "#8BC34A"
          };
        case 4:
          return {
            title: "Muy seguro",
            icon: "sentiment_very_satisfied",
            color: "#4CAF50"
          };
        default:
          return {
            title: "Nada seguro",
            icon: "sentiment_very_dissatisfied",
            color: "#f44336"
          };
      }
    }
  }
};
</script>

<style scoped>
.icon-status {
  width: 100%;
  padding: 15px 16px 30px 16px;
  text-align: center;
}

.icon-status > i {
  transition: 0.5s all;
  font-size: 3.6rem;
}
</style>
