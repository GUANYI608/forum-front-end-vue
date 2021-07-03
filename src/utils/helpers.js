import axios from 'axios'
import Swal from 'sweetalert2'

// 以下伺服器沒有 admin 權限，無法查看後台相關資料
// const baseURL = "https://forum-express-api.herokuapp.com/api"
// 以下伺服器有 admin 權限，須在本機開啟後端伺服器
const baseURL = "http://localhost:3000/api"

export const apiHelper = axios.create({
  baseURL
})

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