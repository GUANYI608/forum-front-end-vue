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
      <button type="submit" class="btn btn-primary mr-0">Submit</button>
    </div>
  </form>
</template>

<script>
// 利用uuid產生隨機user的id
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      text: "",
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
    handleSubmit() {
      // TODO: 向 API 發送 POST 請求
      // 伺服器新增 Comment 成功後...
      this.$emit("after-create-comment", {
        commentId: uuidv4(), // 尚未串接 API 前，暫時使用隨機的 id
        restaurantId: this.restaurantId,
        text: this.text,
      });
      this.text = ""; // 將表單內的資料清空
    },
  },
};
</script>
