import axios from 'axios'

const baseUrl = 'https://pardon-pwa.herokuapp.com/api/'
axios.defaults.baseURL = baseUrl

export default {
  user: {
    async register(email, login, password) {
      return axios.post('user/SignUp', { login, password })
    },

    async login(login, password) {
      return axios.post('user/LogIn', { login, password })
    },

    async logout() {
      return axios.get('user/logout')
    }
  }
}
