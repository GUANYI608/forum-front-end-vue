<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant" />
    <hr />
    <!-- 餐廳評論 RestaurantComments -->
    <!-- restaurantComments是對應至data屬性裡回傳的內容 -->
    <RestaurantComments
      :restaurant-comments="restaurantComments"
      @after-delete-comment="afterDeleteComment"
    />
    <!-- 新增評論 CreateComment -->
    <CreateComment
      :restaurant-id="restaurant.id"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import RestaurantDetail from "./../components/RestaurantDetail";
import RestaurantComments from "./../components/RestaurantComments";
import CreateComment from "./../components/CreateComment";
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "Restaurant",
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
        isFavorited: false,
        isLiked: false,
      },
      restaurantComments: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  // 監聽路由變化：當直接透過路由去修改餐廳 id 時，不需重新整理，修改為路由即自動重新抓取餐廳資料
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params;
    this.fetchRestaurant(restaurantId);
    next();
  },
  methods: {
    // 顯示餐廳資料
    async fetchRestaurant(restaurantId) {
      try {
        // 透過 restaurantsAPI 取得餐廳資訊
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId });
        const { restaurant, isFavorited, isLiked } = data;
        const {
          id,
          name,
          Category,
          image,
          opening_hours: openingHours,
          tel,
          address,
          description,
          Comments,
        } = restaurant;

        // 將 API 取得的資料放入 vue 的 data 內
        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : "未分類",
          image,
          openingHours,
          tel,
          address,
          description,
          isFavorited,
          isLiked,
        };
        this.restaurantComments = Comments;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },
    // 渲染刪除comment後的畫面
    afterDeleteComment(commentId) {
      // 以 filter 保留未被刪除的 comment.id
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      );
    },
    // 依照form送出的新 comment 重新渲染畫面
    // payload就是指「放在物件裡的一包資料」
    afterCreateComment(payload) {
      // 利用解構賦值的方式拿取以下子元件所需的資料：CreateComment
      const { commentId, restaurantId, text } = payload;
      // 利用 push 把以上的 payload 的內容放進陣列
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
        text, // text 是 text: text 的縮寫
        createdAt: new Date(), // createdAt: new Date() 直接抓當下的時間
      });
    },
  },
};
</script>