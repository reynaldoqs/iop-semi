<template>
    <div>
        <el-container>
        <el-header height="auto">
      <tool-bar/>
    </el-header>
        <el-main>Main</el-main>
        </el-container>
    </div>
</template>
<script>
import ToolBar from "@/app/components/ToolBar";
export default {
  components: {
    ToolBar
  }
};
</script>

<style scoped>
.el-header {
  background-color: #191919;
  width: 100%;
}
</style>