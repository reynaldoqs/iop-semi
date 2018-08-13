<template>
<div>
    <NavView
        :isLoggedIn="isUserAuthenticated"
        v-on:onLogout="logout"
        v-on:toLoginPage="toLogin"
        v-on:changeDrawer="changeDrawer"
    />
</div>
</template>


<script>
import NavView from "./NavView";
import { mapGetters } from "vuex";

export default {
  components: {
    NavView
  },
  methods: {
    changeDrawer() {
      this.$emit("changeDrawer");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    toLogin() {
      this.$router.push("/login");
    }
  },
  computed: {
    ...mapGetters(["isUserAuthenticated"])
  }
};
</script>
