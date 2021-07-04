import { apiHelper } from '../utils/helpers'

export default {
  // 新增評論
  create({ restaurantId, text }) {
    // 發送 POST 請求時，會夾帶想要新增的資料(如果沒有則寫 null)，因此要注意一下參數設計
    return apiHelper.post(
      '/comments',
      { restaurantId, text }
    )
  },
  // 刪除評論
  delete({ commentId }) {
    return apiHelper.delete(
      `/comments/${commentId}`
    )
  }
}