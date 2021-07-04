import { apiHelper } from '../utils/helpers'

export default {
  // 取得當前使用者的資料
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`)
  },
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getTopUsers() {
    return apiHelper.get('/users/top')
  },
  addFavorite({ restaurantId }) {
    // 發送 POST 請求時，會夾帶想要新增的資料(如果沒有則寫 null)，因此要注意一下參數設計和 GET 的情境不太一樣
    // 把 token 帶到 headers 中
    return apiHelper.post(`/favorite/${restaurantId}`, null)
  },
  deleteFavorite({ restaurantId }) {
    return apiHelper.delete(`/favorite/${restaurantId}`)
  },
  addLike({ restaurantId }) {
    // 發送 POST 請求時，會夾帶想要新增的資料(如果沒有則寫 null)，因此要注意一下參數設計和 GET 的情境不太一樣
    // 把 token 帶到 headers 中
    return apiHelper.post(`/like/${restaurantId}`, null)
  },
  deleteLike({ restaurantId }) {
    return apiHelper.delete(`/like/${restaurantId}`)
  },
  addFollowing({ userId }) {
    return apiHelper.post(`/following/${userId}`, null)
  },
  deleteFollowing({ userId }) {
    return apiHelper.delete(`/following/${userId}`)
  }
}