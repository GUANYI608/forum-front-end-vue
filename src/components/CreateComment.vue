<template>
  <form v-on:submit.prevent.stop="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea v-model="text" class="form-control" rows="3" name="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">
        回上一頁
      </button>
      <button
        type="submit"
        class="btn btn-primary mr-0"
        :disabled="isProcessing"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import commentsAPI from "./../apis/comments";
import { Toast } from "./../utils/helpers";

export default {
  name: "CreateComment",
  data() {
    return {
      text: "",
      isProcessing: false,
    };
  },
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
  },
  // 處理 submit 行為
  methods: {
    async handleSubmit() {
      try {
        // 評論不得為空白
        if (!this.text) {
          Toast.fire({
            icon: "warning",
            title: "尚未填寫任何評論",
          });
        }

        this.isProcessing = true;

        // 串接 API
        const { data } = await commentsAPI.create({
          restaurantId: this.restaurantId,
          text: this.text,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.isProcessing = false;
        this.text = "";
        // 伺服器新增 Comment 成功後...
        this.$emit("after-create-comment", {
          commentId: data.commentId,
          restaurantId: this.restaurantId,
          text: this.text,
        });
        this.text = ""; // 將表單內的資料清空
      } catch (error) {
        console.error(error.message);
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法新增評論，請稍後再試",
        });
      }
    },
  },
};
</script>
