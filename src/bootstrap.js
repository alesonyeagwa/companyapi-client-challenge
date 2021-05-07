window.axios = require('axios')

window.axios.defaults.baseURL = 'https://localhost:44322/api'
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const user = JSON.parse(localStorage.getItem('user'))

var token = user && user.token ? user.token : null
if (token) {
  window.axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
}
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

window.axios.interceptors.response.use(
  function (successRes) {
    return successRes
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 419) {
    }
    return Promise.reject(error)
  }
)
