import { apiHelper } from './../utils/helpers'

export default {
  // 取得單一餐廳資料
  getRestaurant({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`)
  },
  // 取得所有餐廳與頁面
  getRestaurants({ page, categoryId }) {
    // 取得 categoryId 與 page 參數，放入路由內
    const searchParams = new URLSearchParams({ page, categoryId })
    // 發出 GET 請求
    return apiHelper.get(`/restaurants?${searchParams.toString()}`)
  },
  // 取得最新動態
  getFeeds() {
    return apiHelper.get('/restaurants/feeds')
  },
  // 取得人氣餐廳
  getTopRestaurants() {
    return apiHelper.get('restaurants/top')
  }
}