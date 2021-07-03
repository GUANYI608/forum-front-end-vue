<template>
  <!-- 餐廳類別資料未載入完成前，不渲染表單元件 -->
  <form v-show="!isLoading" @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="restaurant.name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      />
    </div>

    <div class="form-group">
      <label for="categoryId">Category</label>
      <select
        id="categoryId"
        v-model="restaurant.categoryId"
        class="form-control"
        name="categoryId"
        required
      >
        <option value="" selected disabled>--請選擇--</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="tel">Tel</label>
      <input
        id="tel"
        v-model="restaurant.tel"
        type="text"
        class="form-control"
        name="tel"
        placeholder="Enter telephone number"
      />
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input
        id="address"
        v-model="restaurant.address"
        type="text"
        class="form-control"
        placeholder="Enter address"
        name="address"
      />
    </div>

    <div class="form-group">
      <label for="opening-hours">Opening Hours</label>
      <input
        id="opening-hours"
        v-model="restaurant.openingHours"
        type="time"
        class="form-control"
        name="opening_hours"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="restaurant.description"
        class="form-control"
        rows="3"
        name="description"
      />
    </div>

    <div class="form-group">
      <label for="image">Image</label>
      <img
        v-if="restaurant.image"
        :src="restaurant.image"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      />
      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="form-control-file"
        @change="handleFileChange"
      />
    </div>

    <button type="submit" class="btn btn-primary" :disabled="isProcessing">
      {{ isProcessing ? "處理中..." : "送出" }}
    </button>
  </form>
</template>

<script>
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  props: {
    // 拿到 AdminRestaurantEdit 傳入的資料
    initialRestaurant: {
      type: Object,
      // 當我們要為物件或陣列類型的資料設定預設值時，需要使用 () => ({}) 的寫法來回傳物件
      default: () => ({
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      }),
    },
    // 避免使用者重複按送出
    isProcessing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 會需要兩種資料：restaurant 與 categories
      restaurant: {
        ...this.initialrestaurant,
      },
      categories: [],
      isLoading: true,
    };
  },
  // 透過 Watch 監聽 initialRestaurant 的變化
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue,
      };
    },
  },
  created() {
    this.fetchCategories();
    this.restaurant = {
      ...this.restaurant, // 使用預設值：空白表單
      ...this.initialRestaurant, // 使用父層傳來的資料，若沒有資料就演算default的內容
    };
  },
  methods: {
    async fetchCategories() {
      try {
        // 向伺服器取得餐廳類別清單
        const { data } = await adminAPI.categories.get();

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.categories = data.categories;
        this.isLoading = false;
      } catch (error) {
        // 在 catch 中進行錯誤處理
        this.isLoading = false;

        Toast.fire({
          icon: "error",
          title: "無法取得餐廳類別，請稍後再試",
        });
      }
    },
    handleFileChange(e) {
      const files = e.target.files;

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.restaurant.image = "";
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.restaurant.image = imageURL;
      }
    },
    // 處理表單送出
    handleSubmit(e) {
      // 處理必填資訊：name 與 categoryId
      if (!this.restaurant.name) {
        Toast.fire({
          icon: "warning",
          title: "請填寫餐廳名稱",
        });
        return;
      } else if (!this.restaurant.categoryId) {
        Toast.fire({
          icon: "warning",
          title: "請選擇餐廳類別",
        });
        return;
      }

      const form = e.target; // 指 <form></form>
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    },
  },
};
</script>