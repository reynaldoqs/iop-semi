<template>
  <div>
    <div class="iop-avatar">
      <el-dropdown>
      <div class="iop-avatar-container">
        <img src="https://png.icons8.com/metro/40/424343/administrator-male.png">
      </div>
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
.iop-avatar img {
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 50%;
  background-color: var(--ds-bg-1);
  cursor: pointer;
}
.iop-avatar {
  margin: 0 10px;
}
</style>

