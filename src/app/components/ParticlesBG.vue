<template>
  <div>
    <div class="particles-container">
      <vue-particles
          class="particles"
          color="#dedede"
          :particleOpacity="0.3"
          :particlesNumber="90"
          shapeType="circle"
          :particleSize="8"
          linesColor="#dedede"
          :linesWidth="2"
          :lineLinked="true"
          :lineOpacity="0.1"
          :linesDistance="150"
          :moveSpeed="2"
          :hoverEffect="false"
          hoverMode="grab"
          :clickEffect="false"
          clickMode="repulse"
      >
      </vue-particles>
      <div class="particles-slot">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.particles-container {
  width: 100%;
  height: 100%;
  background-color: black;
}
.particles {
  background: linear-gradient(
    10deg,
    var(--inter-secondary),
    var(--inter-primary)
  );
  z-index: 1;
  width: 100%;
  height: 100vh;
  max-height: 100%;
  overflow: hidden;
}
.particles-slot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
