import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  categories: {
    get() {
      return apiHelper.get('/admin/categories', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    }
  },
  restaurants: {
    // 因為是 POST 請求，所以第二個參數是 formData
    // 表單資料被包裝成 FormData 物件
    create({ formData }) {
      return apiHelper.post('/admin/restaurants', formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    // 取得餐廳資料
    get() {
      return apiHelper.get('/admin/restaurants', {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    },
    // 刪除餐廳資料
    delete({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    }
  },
}