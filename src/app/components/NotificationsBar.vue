<template>
    <div class="iop-notifications-bar">
        <notifications-header/>
    </div>
</template>
<script>
import NotificationsHeader from "@/app/components/NotificationsHeader";
export default {
  components: {
    NotificationsHeader
  }
};
</script>

<style scoped>
.iop-notifications-bar {
  min-width: 240px;
  min-height: 400px;
  padding: 16px;
}
</style>
