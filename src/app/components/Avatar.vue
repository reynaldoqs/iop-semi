<template>
  <div>
    <div class="avatar">
      <el-dropdown>
      <img src="../../assets/user.jpg" alt="">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item disabled>Action 4</el-dropdown-item>
        <el-dropdown-item divided>Action 5</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>    
    </div>
  </div>
</template>
<style scoped>
.avatar img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  cursor: pointer;
}
</style>

