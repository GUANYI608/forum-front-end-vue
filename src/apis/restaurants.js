import { apiHelper } from './../utils/helpers'
// 用了 getItem 來取出 LocalStorage 裡的 token，並回傳給 getToken
const getToken = () => localStorage.getItem('token')

export default {
  getRestaurants({ page, categoryId }) {
    // 取得 categoryId 與 page 參數，放入路由內
    const searchParams = new URLSearchParams({ page, categoryId })
    // 發出 GET 請求
    return apiHelper.get(`/restaurants?${searchParams.toString()}`, {
      // HTTP Header 攜帶 token
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}