<template>
  <div>
    <h2 class="my-4">所有評論：</h2>

    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          v-if="currentUser.isAdmin"
          type="button"
          class="btn btn-danger float-right"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
        >
          Delete
        </button>
        <h3>
          <router-link :to="{ name: 'user', params: { id: comment.User.id } }">
            {{ comment.User.name }}
          </router-link>
        </h3>
        <p>
          {{ comment.text }}
        </p>
        <footer class="blockquote-footer">
          {{ comment.createdAt | fromNow }}
        </footer>
      </blockquote>
      <hr />
    </div>
  </div>
</template>

<script>
// 載入撰寫好的 mixin
import { fromNowFilter } from "./../utils/mixins";
import commentsAPI from "./../apis/comments";
import { Toast } from "./../utils/helpers";
// 載入使用者資料
import { mapState } from "vuex";

export default {
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true,
    },
  },
  // 取得 vuex 的 currentUser
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    // Delete button : 刪除評論功能
    async handleDeleteButtonClick(commentId) {
      try {
        this.isProcessing = true;

        const { data } = await commentsAPI.delete({ commentId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
        this.$emit("after-delete-comment", commentId);

        // 發送成功訊息
        Toast.fire({
          icon: "success",
          title: "移除評論成功",
        });

        this.isProcessing = false;
      } catch (error) {
        console.error(error.message);
        this.isProcessing = false;
        // 發送錯誤訊息
        Toast.fire({
          icon: "error",
          title: "無法移除評論，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
h2.my-4 {
  margin-bottom: 1rem !important;
  font-size: 18px;
}

h3 {
  margin-bottom: 3px;
  line-height: 1.3;
}

.blockquote-footer {
  font-size: 12.5px;
}
</style>