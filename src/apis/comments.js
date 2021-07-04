import { apiHelper } from '../utils/helpers'
// 用了 getItem 來取出 LocalStorage 裡的 token，並回傳給 getToken
const getToken = () => localStorage.getItem('token')

export default {
  // 新增評論
  create({ restaurantId, text }) {
    // 發送 POST 請求時，會夾帶想要新增的資料(如果沒有則寫 null)，因此要注意一下參數設計
    return apiHelper.post(
      '/comments',
      { restaurantId, text },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    )
  },
  // 刪除評論
  delete({ commentId }) {
    return apiHelper.delete(
      `/comments/${commentId}`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    )
  }
}