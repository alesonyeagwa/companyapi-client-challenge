const axios = require('axios')

export const UserService = {
  login: (username, password) =>{
    return axios.post('/login', { username, password })
  },
  logout: () => {
    localStorage.removeItem('user');
  }
}