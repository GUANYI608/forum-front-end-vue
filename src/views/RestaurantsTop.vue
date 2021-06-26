<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>

    <hr />

    <div
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      class="card mb-3"
      style="max-width: 540px; margin: auto"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            <img class="card-img" :src="restaurant.image" />
          </router-link>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <span class="badge badge-secondary"
              >收藏數：{{ restaurant.FavoriteCount }}</span
            >
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <router-link
              class="btn btn-primary mr-2"
              :to="{ name: 'restaurant', params: { id: restaurant.id } }"
            >
              Show
            </router-link>

            <button
              v-if="restaurant.isFavorited"
              type="button"
              class="btn btn-danger mr-2"
              @click.stop.prevent="deleteFavorite(restaurant.id)"
            >
              移除最愛
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click.stop.prevent="addFavorite(restaurant.id)"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import NavTabs from "./../components/NavTabs";

// 將postman資料存放在dummyData
const dummyData = {
  restaurants: [
    {
      id: 6,
      name: "Miss Darrel Funk",
      tel: "1-174-686-9086 x8073",
      address: "11507 Weimann Place",
      opening_hours: "08:00",
      description: "Veniam omnis in iste perferendis quod quia tempora",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=84.47709833016874",
      viewCounts: 0,
      createdAt: "2021-05-17T05:11:05.000Z",
      updatedAt: "2021-05-17T05:11:05.000Z",
      CategoryId: 4,
      FavoritedUsers: [
        {
          id: 11,
          name: "Itadori Yuji",
          email: "Da@example.com",
          password:
            "$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K",
          isAdmin: false,
          image: "https://i.imgur.com/pIHFJtM.png",
          createdAt: "2021-05-29T07:38:44.000Z",
          updatedAt: "2021-05-29T16:30:20.000Z",
          Favorite: {
            UserId: 11,
            RestaurantId: 6,
            createdAt: "2021-05-30T07:56:52.000Z",
            updatedAt: "2021-05-30T07:56:52.000Z",
          },
        },
        {
          id: 41,
          name: "dan",
          email: "sss@gmail,com",
          password:
            "$2a$10$Y0CtfnZzxCUDjvudBFFRbu3kBLQ/zFuaMp5dBTvGKfQh94ga5OkU2",
          isAdmin: false,
          image: null,
          createdAt: "2021-06-18T14:27:37.000Z",
          updatedAt: "2021-06-18T14:27:37.000Z",
          Favorite: {
            UserId: 41,
            RestaurantId: 6,
            createdAt: "2021-06-18T14:29:11.000Z",
            updatedAt: "2021-06-18T14:29:11.000Z",
          },
        },
        {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$XaxJSOdUg2/931GxMxcJpOWAB1wmUbW5WUwM1GohFh0SyfUxHNYKG",
          isAdmin: false,
          image: "https://i.imgur.com/eVfTIsY.jpg",
          createdAt: "2021-05-17T05:11:05.000Z",
          updatedAt: "2021-06-23T12:15:27.000Z",
          Favorite: {
            UserId: 1,
            RestaurantId: 6,
            createdAt: "2021-06-21T14:03:21.000Z",
            updatedAt: "2021-06-21T14:03:21.000Z",
          },
        },
      ],
      isFavorited: true,
      FavoriteCount: 3,
    },
    {
      id: 5,
      name: "Isabelle Emmerich",
      tel: "642.420.1404 x4385",
      address: "34249 Volkman Grove",
      opening_hours: "08:00",
      description: "non ea illo",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=36.36127013737524",
      viewCounts: 9,
      createdAt: "2021-05-17T05:11:05.000Z",
      updatedAt: "2021-06-21T12:08:53.000Z",
      CategoryId: 1,
      FavoritedUsers: [
        {
          id: 11,
          name: "Itadori Yuji",
          email: "Da@example.com",
          password:
            "$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K",
          isAdmin: false,
          image: "https://i.imgur.com/pIHFJtM.png",
          createdAt: "2021-05-29T07:38:44.000Z",
          updatedAt: "2021-05-29T16:30:20.000Z",
          Favorite: {
            UserId: 11,
            RestaurantId: 5,
            createdAt: "2021-05-30T07:56:50.000Z",
            updatedAt: "2021-05-30T07:56:50.000Z",
          },
        },
        {
          id: 31,
          name: "12",
          email: "123@123",
          password:
            "$2a$10$P4OM.30O29Gnh3D3fh0d2eD53LCDBO.24hurukOU/sRqgmJAS53TG",
          isAdmin: false,
          image: null,
          createdAt: "2021-06-17T07:15:33.000Z",
          updatedAt: "2021-06-17T07:15:33.000Z",
          Favorite: {
            UserId: 31,
            RestaurantId: 5,
            createdAt: "2021-06-17T07:16:12.000Z",
            updatedAt: "2021-06-17T07:16:12.000Z",
          },
        },
      ],
      isFavorited: false,
      FavoriteCount: 2,
    },
    {
      id: 3,
      name: "Aglae Gulgowski",
      tel: "114.568.9420 x031",
      address: "43362 Noel Turnpike",
      opening_hours: "08:00",
      description: "At commodi ut veritatis et velit est quis. Ut laud",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=79.91299846538044",
      viewCounts: 8,
      createdAt: "2021-05-17T05:11:05.000Z",
      updatedAt: "2021-06-21T15:41:54.000Z",
      CategoryId: 4,
      FavoritedUsers: [
        {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$XaxJSOdUg2/931GxMxcJpOWAB1wmUbW5WUwM1GohFh0SyfUxHNYKG",
          isAdmin: false,
          image: "https://i.imgur.com/eVfTIsY.jpg",
          createdAt: "2021-05-17T05:11:05.000Z",
          updatedAt: "2021-06-23T12:15:27.000Z",
          Favorite: {
            UserId: 1,
            RestaurantId: 3,
            createdAt: "2021-05-27T15:40:21.000Z",
            updatedAt: "2021-05-27T15:40:21.000Z",
          },
        },
        {
          id: 11,
          name: "Itadori Yuji",
          email: "Da@example.com",
          password:
            "$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K",
          isAdmin: false,
          image: "https://i.imgur.com/pIHFJtM.png",
          createdAt: "2021-05-29T07:38:44.000Z",
          updatedAt: "2021-05-29T16:30:20.000Z",
          Favorite: {
            UserId: 11,
            RestaurantId: 3,
            createdAt: "2021-05-30T07:56:48.000Z",
            updatedAt: "2021-05-30T07:56:48.000Z",
          },
        },
      ],
      isFavorited: true,
      FavoriteCount: 2,
    },
    {
      id: 1,
      name: "Keely BogisichDa",
      tel: "119.568.4472 x714",
      address: "9991 Dorothy Canyon",
      opening_hours: "08:00",
      description: "Beatae et sit aut velit sed minus esse est est. Cu",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=43.31238337743435",
      viewCounts: 34,
      createdAt: "2021-05-17T05:11:05.000Z",
      updatedAt: "2021-06-25T00:18:09.000Z",
      CategoryId: 1,
      FavoritedUsers: [
        {
          id: 11,
          name: "Itadori Yuji",
          email: "Da@example.com",
          password:
            "$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K",
          isAdmin: false,
          image: "https://i.imgur.com/pIHFJtM.png",
          createdAt: "2021-05-29T07:38:44.000Z",
          updatedAt: "2021-05-29T16:30:20.000Z",
          Favorite: {
            UserId: 11,
            RestaurantId: 1,
            createdAt: "2021-05-30T07:56:47.000Z",
            updatedAt: "2021-05-30T07:56:47.000Z",
          },
        },
        {
          id: 41,
          name: "dan",
          email: "sss@gmail,com",
          password:
            "$2a$10$Y0CtfnZzxCUDjvudBFFRbu3kBLQ/zFuaMp5dBTvGKfQh94ga5OkU2",
          isAdmin: false,
          image: null,
          createdAt: "2021-06-18T14:27:37.000Z",
          updatedAt: "2021-06-18T14:27:37.000Z",
          Favorite: {
            UserId: 41,
            RestaurantId: 1,
            createdAt: "2021-06-18T14:29:04.000Z",
            updatedAt: "2021-06-18T14:29:04.000Z",
          },
        },
      ],
      isFavorited: false,
      FavoriteCount: 2,
    },
    {
      id: 48,
      name: "Dr. Angelita Cassin",
      tel: "(934) 446-1520 x790",
      address: "6463 Dach Parkway",
      opening_hours: "08:00",
      description: "A perferendis doloremque quae alias officiis ea. E",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=57.07047964964713",
      viewCounts: 0,
      createdAt: "2021-05-17T05:11:05.000Z",
      updatedAt: "2021-05-17T05:11:05.000Z",
      CategoryId: 1,
      FavoritedUsers: [
        {
          id: 11,
          name: "Itadori Yuji",
          email: "Da@example.com",
          password:
            "$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K",
          isAdmin: false,
          image: "https://i.imgur.com/pIHFJtM.png",
          createdAt: "2021-05-29T07:38:44.000Z",
          updatedAt: "2021-05-29T16:30:20.000Z",
          Favorite: {
            UserId: 11,
            RestaurantId: 48,
            createdAt: "2021-05-29T11:29:30.000Z",
            updatedAt: "2021-05-29T11:29:30.000Z",
          },
        },
      ],
      isFavorited: false,
      FavoriteCount: 1,
    },
    {
      id: 34,
      name: "Christina Wilderman",
      tel: "994-533-6732 x683",
      address: "781 Manuel Corner",
      opening_hours: "08:00",
      description: "corrupti",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=17.92886995776586",
      viewCounts: 0,
      createdAt: "2021-05-17T05:11:05.000Z",
      updatedAt: "2021-05-17T05:11:05.000Z",
      CategoryId: 1,
      FavoritedUsers: [
        {
          id: 11,
          name: "Itadori Yuji",
          email: "Da@example.com",
          password:
            "$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K",
          isAdmin: false,
          image: "https://i.imgur.com/pIHFJtM.png",
          createdAt: "2021-05-29T07:38:44.000Z",
          updatedAt: "2021-05-29T16:30:20.000Z",
          Favorite: {
            UserId: 11,
            RestaurantId: 34,
            createdAt: "2021-05-29T11:29:29.000Z",
            updatedAt: "2021-05-29T11:29:29.000Z",
          },
        },
      ],
      isFavorited: false,
      FavoriteCount: 1,
    },
    {
      id: 13,
      name: "Erna Cassin PhD",
      tel: "642-685-6113",
      address: "902 Maegan Inlet",
      opening_hours: "08:00",
      description: "tenetur rerum magnam",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=75.12026971384928",
      viewCounts: 0,
      createdAt: "2021-05-17T05:11:05.000Z",
      updatedAt: "2021-05-17T05:11:05.000Z",
      CategoryId: 1,
      FavoritedUsers: [
        {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$XaxJSOdUg2/931GxMxcJpOWAB1wmUbW5WUwM1GohFh0SyfUxHNYKG",
          isAdmin: false,
          image: "https://i.imgur.com/eVfTIsY.jpg",
          createdAt: "2021-05-17T05:11:05.000Z",
          updatedAt: "2021-06-23T12:15:27.000Z",
          Favorite: {
            UserId: 1,
            RestaurantId: 13,
            createdAt: "2021-05-30T07:56:36.000Z",
            updatedAt: "2021-05-30T07:56:36.000Z",
          },
        },
      ],
      isFavorited: true,
      FavoriteCount: 1,
    },
    {
      id: 9,
      name: "Cecile Schaden",
      tel: "1-132-261-4174",
      address: "768 Boyle Canyon",
      opening_hours: "08:00",
      description: "Et distinctio commodi reprehenderit omnis. Maxime ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=39.152519630246154",
      viewCounts: 2,
      createdAt: "2021-05-17T05:11:05.000Z",
      updatedAt: "2021-05-28T16:31:23.000Z",
      CategoryId: 1,
      FavoritedUsers: [
        {
          id: 11,
          name: "Itadori Yuji",
          email: "Da@example.com",
          password:
            "$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K",
          isAdmin: false,
          image: "https://i.imgur.com/pIHFJtM.png",
          createdAt: "2021-05-29T07:38:44.000Z",
          updatedAt: "2021-05-29T16:30:20.000Z",
          Favorite: {
            UserId: 11,
            RestaurantId: 9,
            createdAt: "2021-05-29T11:29:28.000Z",
            updatedAt: "2021-05-29T11:29:28.000Z",
          },
        },
      ],
      isFavorited: false,
      FavoriteCount: 1,
    },
    {
      id: 8,
      name: "Dr. Ansley Johnston",
      tel: "294-480-0575",
      address: "1071 Idell Gardens",
      opening_hours: "08:00",
      description: "eum",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=81.1442811444988",
      viewCounts: 4,
      createdAt: "2021-05-17T05:11:05.000Z",
      updatedAt: "2021-05-28T16:30:48.000Z",
      CategoryId: 5,
      FavoritedUsers: [
        {
          id: 31,
          name: "12",
          email: "123@123",
          password:
            "$2a$10$P4OM.30O29Gnh3D3fh0d2eD53LCDBO.24hurukOU/sRqgmJAS53TG",
          isAdmin: false,
          image: null,
          createdAt: "2021-06-17T07:15:33.000Z",
          updatedAt: "2021-06-17T07:15:33.000Z",
          Favorite: {
            UserId: 31,
            RestaurantId: 8,
            createdAt: "2021-06-17T07:15:48.000Z",
            updatedAt: "2021-06-17T07:15:48.000Z",
          },
        },
      ],
      isFavorited: false,
      FavoriteCount: 1,
    },
    {
      id: 2,
      name: "Alexandrine McKenzie DVM",
      tel: "(266) 656-0345 x270",
      address: "0142 Smith Gateway",
      opening_hours: "08:00",
      description: "voluptas",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=7.1615087469963035",
      viewCounts: 13,
      createdAt: "2021-05-17T05:11:05.000Z",
      updatedAt: "2021-06-22T16:08:18.000Z",
      CategoryId: 5,
      FavoritedUsers: [
        {
          id: 11,
          name: "Itadori Yuji",
          email: "Da@example.com",
          password:
            "$2a$10$p7b9n0Gg1WNmrhTx.pQfhOtkCcynVowSDNM6BpMORotEz/d6.nA0K",
          isAdmin: false,
          image: "https://i.imgur.com/pIHFJtM.png",
          createdAt: "2021-05-29T07:38:44.000Z",
          updatedAt: "2021-05-29T16:30:20.000Z",
          Favorite: {
            UserId: 11,
            RestaurantId: 2,
            createdAt: "2021-05-30T07:56:47.000Z",
            updatedAt: "2021-05-30T07:56:47.000Z",
          },
        },
      ],
      isFavorited: false,
      FavoriteCount: 1,
    },
  ],
};

export default {
  components: {
    NavTabs,
  },
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.fetchTopRestaurants();
  },
  methods: {
    fetchTopRestaurants() {
      this.restaurants = dummyData.restaurants;
    },
    addFavorite(restaurantId) {
      this.restaurants = this.restaurants
        .map((restaurant) => {
          if (restaurant.id !== restaurantId) {
            return restaurant;
          }
          return {
            ...restaurant,
            FavoriteCount: restaurant.FavoriteCount + 1,
            isFavorited: true,
          };
        })
        .sort((a, b) => b.FavoriteCount - a.FavoriteCount);
    },
    deleteFavorite(restaurantId) {
      this.restaurants = this.restaurants
        .map((restaurant) => {
          if (restaurant.id !== restaurantId) {
            return restaurant;
          }
          return {
            ...restaurant,
            FavoriteCount: restaurant.FavoriteCount - 1,
            isFavorited: false,
          };
        })
        .sort((a, b) => b.FavoriteCount - a.FavoriteCount);
    },
  },
};
</script>