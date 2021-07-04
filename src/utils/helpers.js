import axios from 'axios'
import Swal from 'sweetalert2'

// 以下伺服器沒有 admin 權限，無法查看後台相關資料
// const baseURL = "https://forum-express-api.herokuapp.com/api"
// 以下伺服器有 admin 權限，須在本機開啟後端伺服器
const baseURL = "http://localhost:3000/api"

const axiosInstance = axios.create({
  baseURL
})
// 透過 interceptors 的使用，讓 axios 在當使用者有登入（有 token）的情況下，把所有發出去的請求都添加上 Authorization 的標頭
axiosInstance.interceptors.request.use(
  config => {
    // 從 localStorage 將 token 取出
    const token = localStorage.getItem('token')

    // 如果 token 存在的話，則帶入到 headers 當中
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

export const apiHelper = axiosInstance

// copy from SweetAlert2
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})