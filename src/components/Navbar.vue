<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/"> 餐廳評論網 </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is admin -->
        <router-link
          v-if="currentUser.isAdmin"
          to="/admin"
          class="text-white mr-3"
        >
          管理員後台
        </router-link>

        <template v-if="isAuthenticated">
          <!-- is user is login -->
          <router-link
            :to="{ name: 'user', params: { id: currentUser.id } }"
            class="text-white mr-3"
          >
            {{ currentUser.name || "使用者" }} 您好
          </router-link>
          <button
            type="button"
            class="btn btn-sm btn-outline-success my-2 my-sm-0"
            @click="logout"
          >
            登出
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    logout() {
      // 呼叫 mutatioms 的函式移除 token
      this.$store.commit("revokeAuthentication");
      // 轉址到登入頁面
      this.$router.push("/signin");
    },
  },
};
</script>