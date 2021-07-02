import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  addFavorite({ restaurantId }) {
    // 發送 POST 請求時，會夾帶想要新增的資料(如果沒有則寫 null)，因此要注意一下參數設計和 GET 的情境不太一樣
    // 把 token 帶到 headers 中
    return apiHelper.post(`/favorite/${restaurantId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteFavorite({ restaurantId }) {
    return apiHelper.delete(`/favorite/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  addLike({ restaurantId }) {
    // 發送 POST 請求時，會夾帶想要新增的資料(如果沒有則寫 null)，因此要注意一下參數設計和 GET 的情境不太一樣
    // 把 token 帶到 headers 中
    return apiHelper.post(`/like/${restaurantId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteLike({ restaurantId }) {
    return apiHelper.delete(`/like/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}