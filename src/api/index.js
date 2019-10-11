import axios from 'axios'
const baseUrl = 'https://pardon-pwa.herokuapp.com/api/'

axios.defaults.baseURL = baseUrl

export default {
  user: {
    async register(...credentials) {
      return axios.post('user/register', credentials)
    },

    async login(...credentials) {
      return axios.post('user/login', credentials)
    },

    async logout() {
      return axios.get('user/logout')
    }
  }
}
