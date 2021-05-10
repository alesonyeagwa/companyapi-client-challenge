window.axios = require('axios')

window.axios.defaults.baseURL = 'https://localhost:44322/api'
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'


window.axios.defaults.headers.common['Content-Type'] = 'application/json'

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
