<template>
      <div class="iop-toolbar">
      <div style="margin-right: auto">
       <img src="../../assets/logoWhite.svg" width="40px" alt="">
      </div>
      <div class="right-container">
        <el-button icon="el-icon-search" circle style="margin-right:20px"></el-button>
        <avatar/>
      </div>
    </div>
</template>
<script>
import Avatar from "@/app/components/Avatar.vue";
export default {
  data: () => ({}),
  components: {
    Avatar
  }
};
</script>
<style scoped>
.iop-toolbar {
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.right-container {
  display: flex;
  align-items: center;
}
</style>
