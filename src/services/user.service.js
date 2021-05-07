const axios = require('axios')

export const UserService = {
  login: (username, password) =>{
    return axios.post('/login', { username, password })
  },
  register: (username, password) =>{
    return axios.post('/users', { username, password })
  },
  logout: () => {
    localStorage.removeItem('user');
  }
}