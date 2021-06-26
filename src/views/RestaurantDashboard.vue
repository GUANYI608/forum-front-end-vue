<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.commentsLength }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
//將postman資料存放在dummyData
const dummyData = {
  restaurant: {
    id: 1,
    name: "Keely BogisichDa",
    tel: "119.568.4472 x714",
    address: "9991 Dorothy Canyon",
    opening_hours: "08:00",
    description:
      "Beatae et sit aut velit sed minus esse est est. Cupiditate quod ut impedit ipsa repudiandae dicta blanditiis dignissimos consequuntur. Illum minima explicabo animi nostrum recusandae voluptatum fugit. Sunt impedit praesentium atque. Itaque doloribus minima provident unde odit quod iste et.",
    image:
      "https://loremflickr.com/320/240/restaurant,food/?random=43.31238337743435",
    viewCounts: 34,
    createdAt: "2021-05-17T05:11:05.000Z",
    updatedAt: "2021-06-25T00:18:09.000Z",
    CategoryId: 1,
    Category: {
      id: 1,
      name: "中式料理",
      createdAt: "2021-05-17T05:11:05.000Z",
      updatedAt: "2021-05-17T05:11:05.000Z",
    },
    Comments: [
      {
        id: 1,
        text: "Ex dolorem molestiae id sint.",
        UserId: 1,
        RestaurantId: 1,
        createdAt: "2021-05-17T05:11:05.000Z",
        updatedAt: "2021-05-17T05:11:05.000Z",
        User: {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$XaxJSOdUg2/931GxMxcJpOWAB1wmUbW5WUwM1GohFh0SyfUxHNYKG",
          isAdmin: false,
          image: "https://i.imgur.com/eVfTIsY.jpg",
          createdAt: "2021-05-17T05:11:05.000Z",
          updatedAt: "2021-06-23T12:15:27.000Z",
        },
      },
      {
        id: 101,
        text: "Eligendi et ut magni occaecati ipsum.",
        UserId: 1,
        RestaurantId: 1,
        createdAt: "2021-05-17T05:11:05.000Z",
        updatedAt: "2021-05-17T05:11:05.000Z",
        User: {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$XaxJSOdUg2/931GxMxcJpOWAB1wmUbW5WUwM1GohFh0SyfUxHNYKG",
          isAdmin: false,
          image: "https://i.imgur.com/eVfTIsY.jpg",
          createdAt: "2021-05-17T05:11:05.000Z",
          updatedAt: "2021-06-23T12:15:27.000Z",
        },
      },
      {
        id: 51,
        text: "Exercitationem quis sunt quae repellendus.",
        UserId: 2,
        RestaurantId: 1,
        createdAt: "2021-05-17T05:11:05.000Z",
        updatedAt: "2021-05-17T05:11:05.000Z",
        User: {
          id: 2,
          name: "Fushiguro Megumi",
          email: "user1@example.com",
          password:
            "$2a$10$A0B7wDm/3dqFAxjH45sXW.2ASFMgKVGKU3DH6O5VpnGSG3Bd6Y9kq",
          isAdmin: false,
          image: "https://i.imgur.com/hSgGs9O.jpg",
          createdAt: "2021-05-17T05:11:05.000Z",
          updatedAt: "2021-05-29T16:25:56.000Z",
        },
      },
      {
        id: 151,
        text: "Exercitationem quis sunt quae repellendus.\nEligendi et ut magni occaecati ipsum.",
        UserId: 11,
        RestaurantId: 1,
        createdAt: "2021-05-29T07:47:43.000Z",
        updatedAt: "2021-05-29T07:47:43.000Z",
        User: {
          id: 11,
          name: "Itadori Yuji",
          email: "Da@example.com",
          password:
            "$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K",
          isAdmin: false,
          image: "https://i.imgur.com/pIHFJtM.png",
          createdAt: "2021-05-29T07:38:44.000Z",
          updatedAt: "2021-05-29T16:30:20.000Z",
        },
      },
    ],
  },
};

export default {
  name: "RestaurantDashboard",
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        commentsLength: 0,
        viewCounts: 0,
      },
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    // 出現error  'restaurantId' is defined but never used
    //fetchRestaurant(restaurantId) { =>先不放參數
    fetchRestaurant() {
      const { restaurant } = dummyData;
      const { id, name, Category, Comments, viewCounts } = restaurant;
      this.restaurant = {
        ...this.restaurant,
        id,
        name,
        categoryName: Category ? Category.name : "未分類",
        commentsLength: Comments.length,
        viewCounts,
      };
    },
  },
};
</script>
