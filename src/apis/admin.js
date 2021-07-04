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
    // 取得單一餐廳的 API 資料
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`)
    },
    // 因為是 POST 請求，所以第二個參數是 formData
    // 表單資料被包裝成 FormData 物件
    create({ formData }) {
      return apiHelper.post('/admin/restaurants', formData)
    },
    // 取得餐廳資料
    get() {
      return apiHelper.get('/admin/restaurants')
    },
    // 刪除餐廳資料
    delete({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`)
    },

    update({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData)
    },
  },
}