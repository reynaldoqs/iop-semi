<template>
      <div class="iop-toolbar">
      <div style="left-container">
       <img src="../../assets/logoWhite.svg" width="30px" alt="">
      </div>
      <div class="mid-container">
        <nav-menu/>
      </div>
      <div class="right-container">
        <div class="buttons-container">
          <el-tooltip content="Buscar" placement="bottom">
            <img :src="`https://png.icons8.com/ios/${imgIconZise}/${imgIconColor}/search-filled.png`">
          </el-tooltip>
          <el-tooltip content="Mensajes recividos" placement="bottom">
          <img :src="`https://png.icons8.com/material-sharp/${imgIconZise}/${imgIconColor}/new-post.png`">
          </el-tooltip>
          <el-tooltip content="Notificaciones" placement="bottom">
          <img :src="`https://png.icons8.com/material-rounded/${imgIconZise}/${imgIconColor}/appointment-reminders.png`">
          </el-tooltip>
        </div>
        <avatar/>
      </div>
    </div>
</template>
<script>
import Avatar from "@/app/components/Avatar";
import NavMenu from "@/app/components/NavMenu";
export default {
  data: () => ({
    imgIconZise: 22,
    imgIconColor: "9E9E9E"
  }),
  components: {
    Avatar,
    NavMenu
  }
};
</script>
<style scoped>
.iop-toolbar {
  width: 100%;
  height: 65px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left-container {
  margin-right: auto;
}
.right-container {
  display: flex;
  align-items: center;
}
.buttons-container > img {
  margin: 0 10px;
  cursor: pointer;
}
</style>
