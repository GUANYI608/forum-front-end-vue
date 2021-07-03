import { apiHelper } from './../utils/helpers'

export default {
  // 帶入需要的資料
  signIn({ email, password }) {
    return apiHelper.post('/signin', {
      email,
      password
    })
  },
  // 註冊
  signUp(data) {
    return apiHelper.post('/signup', {
      ...data
    })
  }
}