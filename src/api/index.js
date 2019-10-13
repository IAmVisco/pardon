import axios from 'axios'

const baseUrl = 'https://pardon-pwa.herokuapp.com/api/'
axios.defaults.baseURL = baseUrl

const _getAuthHeaders = (otherHeaders) => {
  const token = localStorage.getItem('token')
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        ...otherHeaders
      }
    }
  }
}

export default {
  user: {
    async register(email, userName, password) {
      return axios.post('user/sign-up', { email, userName, password })
    },

    async login(email, password) {
      return axios.post('user/log-in', { email, password })
    },

    async getSelf() {
      return axios.get('user', _getAuthHeaders())
    },

    async logout() {
      return axios.get('user/logout')
    }
  }
}
