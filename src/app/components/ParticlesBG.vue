<template>
    <div class="particles-container">
      <transition name="fade">
      <vue-particles
          v-if="particlesAnimation"
          class="particles"
          color="#ffffff"
          :particleOpacity="0.4"
          :particlesNumber="70"
          shapeType="circle"
          :particleSize="3"
          linesColor="#ffffff"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.3"
          :linesDistance="180"
          :moveSpeed="2"
          :hoverEffect="false"
          hoverMode="grab"
          :clickEffect="false"
          clickMode="repulse"
      >
      </vue-particles>
      </transition>
      <div class="container">
      <header>
        <div class="items-container">
          <slot name="header"></slot>
        </div>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
      </div>
    </div>
</template>
<script>
export default {
  data: () => ({
    particlesAnimation: false
  }),
  mounted() {
    setTimeout(() => {
      console.log("mostrando");
      this.particlesAnimation = true;
    }, 1000);
  }
};
</script>
<style scoped>
.particles-container {
  width: 100%;
  height: 100vh;
  background-color: #6039aa;
  background-image: linear-gradient(115deg, #6039aa, #1c1e33);
  /*background: #3A1C71;  /* fallback for old browsers */
  /*background: -webkit-linear-gradient(to bottom, #FFAF7B, #D76D77, #3A1C71);  /* Chrome 10-25, Safari 5.1-6 */
  /*background: linear-gradient(to bottom, #FFAF7B, #D76D77, #3A1C71); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.container {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 45px;
  padding-bottom: 120px;
  display: flex;
  flex-direction: column;
}
header {
  width: 100%;
  height: 45px;
}
.items-container {
  width: 100%;
  max-width: 105px;
  margin: 0 auto;
}
main {
  width: 100%;
  flex: 1 0 auto;
}
footer {
  width: 100%;
  height: 70px;
  padding-top: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 768px) {
  .container {
    padding-top: 15px;
    padding-bottom: 20px;
  }
}
</style>
