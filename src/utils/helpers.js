import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = "https://forum-express-api.herokuapp.com/api"

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