<template>
    <div>
        <div class="iop-header">
            <el-badge :value="12" class="item">
                <el-button type="primary" size="midium">
                    <img :src="`https://png.icons8.com/windows/${imgIconSize}/${imgIconColor}/appointment-reminders.png`">
                </el-button>
            </el-badge>
            <div class="date-information">
                <h2>Notificaciones</h2>
                <p>Lunes 12 de febrero</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data: () => ({
    imgIconSize: 30,
    imgIconColor: "F1F1F1"
  })
};
</script>
<style scoped>
.iop-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}
.date-information {
  padding: 0 5px;
}
.date-information > h2 {
  line-height: 14px;
  font-size: 17px;
  font-weight: 700;
  margin: 0;
  color: var(--ds-txt-1);
}
.date-information > p {
  line-height: 13px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ds-txt-2);
  margin: 10px 0;
}
.iop-header .el-button {
  padding: 2px 5px;
}
</style>
