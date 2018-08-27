<template>
    <div>
        <particlesBG >
          <div slot="header">
            <img src="../../assets/logoWhite.svg" width="70px" alt="">
          </div>
          <div>
              <main-page-view/>
          </div>
          <div slot="footer">
            <div class="btn-scroll">
              <i class="el-icon-arrow-down" />
            </div>
          </div>
        </particlesBG> 
    </div>
</template>
<script>
import particlesBG from "@/app/components/ParticlesBG";
import MainPageView from "@/app/components/MainPageView";
export default {
  data: () => ({
    activeName: "ingreso"
  }),
  components: {
    particlesBG,
    MainPageView
  }
};
</script>
<style scoped>
.btn-scroll {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: solid 1px #f1f1f1;
  margin: 0 auto;
  animation: float 3s ease-in-out infinite;
  cursor: pointer;
  padding: 10px 7px;
  transition: 0.3s background-color ease;
}
.btn-scroll:hover {
  background-color: #f1f1f1;
}
.btn-scroll:hover > i {
  color: #6039aa;
}
.btn-scroll > i {
  color: #f1f1f1;
  font-size: 22px;
  font-weight: 900;
}
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
